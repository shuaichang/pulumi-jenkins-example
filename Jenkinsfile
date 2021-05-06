pipeline {
  agent any
  environment {
    ALICLOUD_ACCESS_KEY = credentials("24d45a1f-5bfc-4f2c-a78d-d9db98c49fa5")
    ALICLOUD_SECRET_KEY = credentials("955b0f0b-7cec-4293-9516-ea2e4b3df78e")
    PULUMI_ACCESS_TOKEN = credentials("a79a5615-7dc3-42a5-9f10-b54b48abc96a")
    PULUMI_STACK = "dev"
  }
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'https://github.com/hryang/pulumi-jenkins-example.git', poll: true, branch: 'main')
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'curl -fsSL https://get.pulumi.com | sh'
        sh '$HOME/.pulumi/bin/pulumi version'
      }
    }

    stage('Pulumi up') {
      steps {
        nodejs('nodejs 15.3.0') {
          withEnv(overrides: ["PATH+PULUMI=$HOME/.pulumi/bin"]) {
            sh 'cd infrastructure && npm install'
            sh 'pulumi stack select ${PULUMI_STACK} --cwd infrastructure/'
            sh 'pulumi up --yes --cwd infrastructure/'
          }

        }

      }
    }

  }
}
