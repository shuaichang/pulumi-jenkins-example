pipeline {
  agent any
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
  environment {
    ALICLOUD_ACCESS_KEY = 'credentials(28009564-4087-43ba-a353-f2ff8ffb84ce)'
    ALICLOUD_SECRET_KEY = 'credentials(d69a4830-dad6-4867-b429-29b29bfd64c1)'
    PULUMI_ACCESS_TOKEN = 'credentials(f13491bc-1455-406d-ae62-6d1017d1bd45)'
    PULUMI_STACK = 'dev'
  }
}