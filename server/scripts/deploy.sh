AWS_ACCOUNT=$1

if [ -z ${AWS_ACCOUNT} ]; then
	echo "You must specify an AWS account"
	exit 1
fi

IMAGE_TAG=1.$(git rev-list --all | wc -l | xargs)

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com

docker build .. -t dothidden

docker tag dothidden ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/dothidden:${IMAGE_TAG}

docker push ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/dothidden:${IMAGE_TAG}

aws cloudformation deploy --stack-name backend-infra --template-file ../../devops/backend-infra.yml \
   	--parameter-overrides VPC=vpc-0c437e98c64953d42 ImageTag=${IMAGE_TAG} \
  	--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

