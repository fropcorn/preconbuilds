ECHO OFF

ECHO "Starting default docker machine..."
"c:\Program Files\Docker Toolbox\docker-machine.exe" start default
ECHO "Started"

ECHO "Building the image. This may take a while..."
"c:\Program Files\Docker Toolbox\docker.exe" build -t precon/api:latest .
ECHO "Image Build"

ECHO "Pushing the new build..."
"c:\Program Files\Docker Toolbox\docker.exe" push precon/api
ECHO "Image Pushed"

ECHO "Shutting off the default docker machine..."
"c:\Program Files\Docker Toolbox\docker-machine.exe" stop default
ECHO "Default machine stopped"