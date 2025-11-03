# Domain Configuration Fix Guide

## 🚨 Current Issue

- ❌ **www.seology.ai** - BROKEN (not working)
- ✅ **app.seology.ai** - WORKING (deployed correctly)
- ❓ **seology.ai** (apex/root domain) - Status unknown

---

## 🔍 What's Happening

### Working: app.seology.ai
This is a **subdomain** pointing to your Vercel deployment. It works because:
- DNS A/CNAME record is configured correctly
- Vercel project is assigned to this domain
- SSL certificate is provisioned

### Broken: www.seology.ai
This is the **www subdomain** and it's broken because:
- Either DNS records are missing
- Or Vercel doesn't have this domain configured
- Or DNS propagation hasn't completed

---

## 🤖 Comet: Check These Things

### 1. Check Vercel Domain Settings

**Navigate to**: Vercel Dashboard → [Your Project] → Settings → Domains

**Look for**:
- [ ] Is `app.seology.ai` listed? (Should be ✅)
- [ ] Is `www.seology.ai` listed? (Probably ❌ missing)
- [ ] Is `seology.ai` (root/apex) listed?

**What you should see**:
```
✅ app.seology.ai        (Production)
❌ www.seology.ai        (Not added)
❌ seology.ai            (Not added)
```

**Screenshot this page!**

---

### 2. Add Missing Domains in Vercel

**If `www.seology.ai` is NOT listed**:

1. Click **"Add"** button in Domains section
2. Enter: `www.seology.ai`
3. Click **"Add"**
4. Vercel will show DNS configuration instructions
5. **Don't skip this step - take screenshot of DNS instructions!**

**Repeat for root domain** (optional but recommended):
1. Enter: `seology.ai`
2. Click "Add"
3. Note DNS instructions

---

### 3. Check DNS Records

**Navigate to**: Your domain registrar (where you bought seology.ai)
- GoDaddy? Namecheap? Cloudflare? Google Domains?

**Check DNS records for seology.ai**:

#### Current DNS (what's working):
```
Type    Name    Value                           Status
CNAME   app     cname.vercel-dns.com           ✅ Working
```

#### What's MISSING (why www is broken):
```
Type    Name    Value                           Status
CNAME   www     cname.vercel-dns.com           ❌ Missing!
A       @       76.76.21.21                     ❌ Missing!
```

**Screenshot your DNS records!**

---

### 4. Fix DNS Configuration

**In your domain registrar's DNS settings**:

#### Add WWW subdomain:
```
Type:   CNAME
Name:   www
Value:  cname.vercel-dns.com.
TTL:    Automatic
```

#### Add Root/Apex domain (optional):
```
Type:   A
Name:   @ (or leave blank for root)
Value:  76.76.21.21
TTL:    Automatic
```

**Alternative for root** (if registrar supports ALIAS/ANAME):
```
Type:   ALIAS or ANAME
Name:   @ (or leave blank)
Value:  cname.vercel-dns.com.
```

**Important**:
- Don't forget the trailing dot: `cname.vercel-dns.com.`
- If using Cloudflare: Turn OFF orange cloud (proxy) for CNAME

---

### 5. Verify DNS Propagation

**Use these tools**:

**Check www.seology.ai**:
```
https://dnschecker.org/#CNAME/www.seology.ai
```

**Should show**:
```
CNAME → cname.vercel-dns.com
```

**Check root seology.ai**:
```
https://dnschecker.org/#A/seology.ai
```

**Should show**:
```
A → 76.76.21.21 (or your Vercel IP)
```

**Screenshot the results!**

---

## 🎯 Expected Configuration

### Correct Setup (All Three Working):

| Domain | Type | Points To | Purpose |
|--------|------|-----------|---------|
| `app.seology.ai` | CNAME | cname.vercel-dns.com | Dashboard/App ✅ |
| `www.seology.ai` | CNAME | cname.vercel-dns.com | Marketing Site ❌ |
| `seology.ai` | A or ALIAS | 76.76.21.21 | Root Domain ❓ |

---

## 🔧 Common Issues

### Issue 1: "Invalid Configuration" in Vercel
**Cause**: Domain not verified
**Solution**:
- Check email for verification link
- Or add TXT record for verification

### Issue 2: "DNS Not Found"
**Cause**: CNAME not added yet
**Solution**: Add CNAME record in DNS

### Issue 3: "Works on app.seology.ai but not www"
**Cause**: Only app subdomain configured
**Solution**: Add www as separate domain in Vercel

### Issue 4: "Redirect Loop"
**Cause**: Multiple redirects configured
**Solution**: Check Vercel redirects and DNS settings

---

## ⚡ Quick Fix Checklist

For Comet to complete:

- [ ] **Check Vercel**: Are all 3 domains added? (app, www, root)
- [ ] **Check DNS**: Are CNAME records set for www and app?
- [ ] **Check DNS**: Is A record set for root domain?
- [ ] **Add Missing**: Add www.seology.ai in Vercel domains
- [ ] **Add DNS**: Add CNAME for www → cname.vercel-dns.com
- [ ] **Wait**: DNS propagation (5-30 minutes)
- [ ] **Test**: Visit www.seology.ai
- [ ] **Verify**: SSL certificate is issued

---

## 📊 Report Template for Comet

```markdown
DOMAIN STATUS CHECK:

### Vercel Domains Configured:
- [ ] app.seology.ai - Yes/No
- [ ] www.seology.ai - Yes/No
- [ ] seology.ai - Yes/No

### DNS Records Found:
- app.seology.ai CNAME: [value or "not found"]
- www.seology.ai CNAME: [value or "not found"]
- seology.ai A record: [value or "not found"]

### Working Status:
- ✅ app.seology.ai - Working
- ❌ www.seology.ai - [Error message]
- ❓ seology.ai - [Status]

### What's Missing:
1. [Missing item 1]
2. [Missing item 2]

### DNS Registrar:
[GoDaddy/Cloudflare/Namecheap/etc.]

### Next Steps:
1. [Action needed]
2. [Action needed]

### Screenshots:
[Attach screenshots of Vercel domains page and DNS records]
```

---

## 🚀 Recommended Domain Structure

### Option A: All domains point to same app
```
seology.ai → Vercel app (marketing + dashboard)
www.seology.ai → Redirect to seology.ai
app.seology.ai → Redirect to seology.ai/dashboard
```

### Option B: Separate subdomains (CURRENT SETUP)
```
seology.ai → Marketing site (or redirect to www)
www.seology.ai → Marketing site
app.seology.ai → Dashboard/App ✅ (currently working)
```

### Option C: Marketing + App split
```
seology.ai → Marketing (Webflow/separate hosting)
www.seology.ai → Marketing (Webflow/separate hosting)
app.seology.ai → SaaS Dashboard (Vercel) ✅
```

**Current setup seems to be Option B** but www is not configured.

---

## 🎯 Immediate Action Items

1. **Add www.seology.ai in Vercel**
   - Vercel Dashboard → Domains → Add → "www.seology.ai"

2. **Add DNS CNAME Record**
   - Go to your DNS provider
   - Add: `www` CNAME → `cname.vercel-dns.com.`

3. **Wait 5-30 minutes** for DNS propagation

4. **Test**: Visit `www.seology.ai`

---

## 🔗 Helpful Links

- **DNS Checker**: https://dnschecker.org
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **What's My DNS**: https://www.whatsmydns.net

---

## ⏱️ Timeline

- DNS changes: 5-30 minutes (usually)
- SSL certificate: Automatic (1-5 minutes after DNS resolves)
- Full propagation: Up to 48 hours (worst case)

---

**Priority**: HIGH - This breaks your main marketing domain!
**Difficulty**: Easy - Just add DNS record
**Time to fix**: 5 minutes + DNS propagation
