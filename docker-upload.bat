docker build -t leahsafe . -f .\docker\Dockerfile

docker tag leahsafe:latest chaoticleah/leahsafe:latest

docker push chaoticleah/leahsafe:latest



docker build -t leahsafe-server . -f .\docker\DockerfileServer

docker tag leahsafe-server:latest chaoticleah/leahsafe-server:latest

docker push chaoticleah/leahsafe-server:latest
