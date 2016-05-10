#!/bin/bash

#1. copy latest heal-puppet.sh

if [[ -e /home/gabbar/healPuppetV8 ]] ; then
echo "already copied"
else
yes | cp -r /home/fcadmin/Fropcorn/MinionService/scripts/heal-puppet.sh /var/
touch /home/gabbar/healPuppetV8
fi

#2. update puppet.conf
#runinterval   = 1800
## run once check
#if [[ -e /home/gabbar/.ramBan ]] ; then
#echo "ramBan executing for more than once, exiting"
#else
runInterval=`cat /etc/puppet/puppet.conf | head -28 | tail -1`
configTime=`cat /etc/puppet/puppet.conf | head -30 | tail -1`
echo "Run Interval: $runInterval"
echo "Config Time Out: $configTime"
if [[ "$runInterval" == '    runinterval   = 1800' || "$configTime" == '    configtimeout = 120' ]]; then
echo "older puppet.conf found, healing started..."
sed -i -e 's/    runinterval   = 1800/    #runinterval   = 1800/g' /etc/puppet/puppet.conf
sed -i -e 's/    configtimeout = 120/    configtimeout = 300/g' /etc/puppet/puppet.conf

service puppet restart

echo "after healing, services restarted..."
fi

#3. add a cronjob if not at all present
fileCron=`cat /etc/crontab`
confirmCron="heal-puppet.sh"
if [[ "$fileCron" == *"$confirmCron"* ]] ; then
echo "$confirmCron exists in crontab"
else
echo "$confirmCron not there in crontab file - adding in crontab"
echo "
*/30 * * * *    root    bash /var/heal-puppet.sh
" >> /etc/crontab
service crond restart
fi

#4. Alter existed cron heal-puppet.sh entry
cronAlter=`cat /etc/crontab`
if [[ "$cronAlter" == *"*/15"* || "$cronAlter" == *"heal-puppet.sh"* ]] ; then
echo "old cron entry foud.. updating now"
sed -i -e 's/*\/15.*.\/var\/heal-puppet.sh$/*\/30 * * * *	root	bash \/var\/heal-puppet.sh/g' /etc/crontab
service crond restart
fi

#5. TO ensure this triggers only once, to avoid
#	multiple executions, though does not harm.

#touch /home/gabbar/.ramBan
#fi





