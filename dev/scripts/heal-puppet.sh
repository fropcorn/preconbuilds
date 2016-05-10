#!/bin/bash
#echo "Internet available, now going further for Puppet reports"
service puppet status &> /var/log/puppetStatus
puppet agent -t &> /var/log/puppetRun
echo "puppet task complete, log are written"
chmod 755 /var/log/puppetStatus
chmod 755 /var/log/puppetRun
puppetSmart=`cat /var/log/puppetRun | head -10`
puppetSmartNew=`cat /var/log/puppetRun | head -2`
puppetReport=`cat /var/log/puppetStatus`
echo "permission updates"
echo "checks start"
if [[
"$puppetSmart" == *"Error: /Stage[main]/Sensu::Package/Exec[sensu_plugin]/returns: change from notrun to 0 failed: Command exceeded timeout"* ||
"$puppetSmart" == *"Error: /File[/var/lib/puppet/facts.d]:"* ||
"$puppetSmart" == *"On the master:"* ||
"$puppetSmartNew" == *"header too long"*
]]; then

echo "Problems encountered in Puppet/Sensu, heal is started"

rm -rf /var/lib/puppet/ssl
rm -rf /usr/local/share/gems/cache/sensu-plugin-1.2.0.gem

fi

