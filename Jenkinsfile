pipeline {
  agent any
  environment {
    ALICLOUD_ACCESS_KEY = credentials("4a2eb6e6-bbef-472d-af4b-080fe185360b")
    ALICLOUD_SECRET_KEY = credentials("0cd51aac-f5cf-4646-8335-3ff65d3dfaa0")
    PULUMI_ACCESS_TOKEN = credentials("a8c70049-f4db-4b18-90dd-d252b17af105")
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
