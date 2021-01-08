pipeline {
  agent any
  environment {
    ALICLOUD_ACCESS_KEY = credentials("9ff473a4-46fb-47e6-8886-62e34373ebb1")
    ALICLOUD_SECRET_KEY = credentials("51ac0b1f-b11f-41b1-be5e-eb503041de9b")
    PULUMI_ACCESS_TOKEN = credentials("9d58d423-28d4-4238-8880-687930d6fb25")
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