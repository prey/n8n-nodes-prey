# n8n-nodes-prey

This is an n8n community node that lets you work with the Prey Developer API in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage notes](#usage-notes)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Account
  - Get account
- Users
  - List users
  - Get user
- Devices
  - List devices
  - Get device
  - Get device location history (JSON or CSV)
  - List device reports
  - Get device report
  - Trigger device action (alarm/alert/lock)
  - Set device status (missing/recovered)
  - Delete device
- Labels
  - List labels
  - Get label
  - Create label
- Zones
  - List zones
  - Get zone
  - Create zone
  - Update zone
- Automations
  - List automations
  - Get automation
- Mass Actions
  - List mass actions
  - Get mass action

## Credentials

This node uses API Key authentication.

### API Key

1. Go to Prey Control Panel → Settings → Developer API.
2. Create an API key (you can set permissions and expiration).
3. Use the API key in the Prey API credential inside n8n.

Note: Creating API keys requires a Personal, Business, or Education plan.

The credential includes a Permission Level field (Read-only or Read & Write) to hide write operations when the key is read-only.

## Usage notes

- The Prey Developer API is currently in **Beta** and has fewer write endpoints than read ones.
- Rate limits are per API key:
  - 2 requests/second
  - 60 requests/minute
  - 10,000 requests/hour

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Prey Developer API (Swagger)](https://api.preyproject.com)
* [Prey API help article](https://help.preyproject.com/article/308-what-can-i-use-the-prey-api-for)
