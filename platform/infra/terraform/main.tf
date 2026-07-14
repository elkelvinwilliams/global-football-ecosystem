# GFE baseline infrastructure - af-south-1 primary, eu-west-1 DR.
# See docs/05-operations/infrastructure.md. Modules stubbed for MVP build-out.

terraform {
  required_version = ">= 1.9"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.70" }
  }
  backend "s3" {
    # bucket/key/dynamodb_table supplied per workspace via -backend-config
  }
}

provider "aws" {
  region = var.region
}

module "network" {
  source = "./modules/network" # VPC, 3 AZ, private/public subnets, NAT
  name   = var.name
  cidr   = "10.40.0.0/16"
}

module "eks" {
  source      = "./modules/eks" # managed control plane + node groups
  name        = var.name
  vpc_id      = module.network.vpc_id
  subnet_ids  = module.network.private_subnets
  node_groups = { general = "m6g.large", workers = "m6g.large", jobs = "c6g.xlarge" }
}

module "database" {
  source     = "./modules/rds" # Postgres 16 Multi-AZ, PITR, cross-region snapshots
  name       = var.name
  vpc_id     = module.network.vpc_id
  subnet_ids = module.network.private_subnets
}

module "storage" {
  source = "./modules/s3" # media + docs buckets, versioning, replication, Object Lock
  name   = var.name
}

module "edge" {
  source = "./modules/cdn" # CloudFront + WAF in front of web/api/media
  name   = var.name
}
