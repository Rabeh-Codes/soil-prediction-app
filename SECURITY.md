# Security Policy

## 🌐 Supported Versions
Only the latest version of our application receives security updates. We strongly recommend always using the most recent release.

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | ✅ Yes             |
| 1.x     | ❌ No (End of Life)|

## 🚨 Reporting a Vulnerability

### Private Disclosure Process
We take security seriously. If you discover a security vulnerability, please **DO NOT** create a public issue. Instead, disclose it responsibly through our private channels:

1. **Preferred Method**:  
<!-- TODO: update contact email & PGP link befor production release -->
   Email our security team at: [security@yourorganization.com](mailto:security@yourorganization.com)  
   Use our PGP key for encrypted communication: [Download Public Key](https://yourdomain.com/security/pgp-key.asc)

2. **Alternative Method**:  
   Use GitHub's private vulnerability reporting:  
   - Go to the **Security** tab in our repository
   - Click **Report a vulnerability**

### Required Information
When reporting a vulnerability, please include:
- Detailed description of the vulnerability
- Steps to reproduce
- Impact analysis
- Suggested fix (if possible)
- Your contact information

## 🔒 NASA API Security Considerations
Special requirements for vulnerabilities affecting NASA API integration:
- **Never include actual NASA API credentials** in reports
- Use test credentials from NASA's sandbox environment
- Mask any sensitive data in reproduction steps
- Follow NASA's [Security Guidelines](https://api.nasa.gov/security)

## ⏱️ Response Timeline
We acknowledge reports within **24 business hours** and follow this process:

| Stage                       | Timeframe          |
|----------------------------|--------------------|
| Initial Response           | 1 business day     |
| Triage & Assessment        | 3 business days    |
| Patch Development          | 7-14 days          |
| Public Disclosure          | After patch rollout|

## 🛡️ Security Measures
Our application implements multiple security layers:

### Application Security
- OWASP Top 10 protections
- CSP (Content Security Policy) headers
- Strict CORS policies for NASA API endpoints
- Input validation and sanitization
- Rate limiting for API requests

### Dependency Security
- Regular vulnerability scanning with Dependabot
- Automated security audits via GitHub Actions
- SBOM (Software Bill of Materials) generation

### NASA API Specific Protections
- Credential rotation every 90 days
- API key encryption at rest and in transit
- Strict permission scoping (least privilege)
- NASA API request signature verification

## 🔄 Security Updates
When vulnerabilities are patched:
1. We release a security advisory on GitHub
2. Patches are applied to the main branch immediately
3. A new patch version is released within 24 hours
4. Critical vulnerabilities are announced via:
   - GitHub Security Advisory
   - Project mailing list
   - Official Twitter account

## 🏆 Recognition
We thank security researchers who responsibly disclose vulnerabilities. With your permission, we will acknowledge your contribution in our:
- Security Hall of Fame
- Release notes
- Social media announcements

## 📜 Legal Considerations
We follow a **coordinated vulnerability disclosure** policy. Good faith efforts to comply with this policy will not result in legal action.

**Note**: Any testing against NASA's production APIs must comply with NASA's [Security Policy](https://www.nasa.gov/offices/ocio/itsecurity) and [Penetration Testing Guidelines](https://www.nasa.gov/content/penetration-testing).