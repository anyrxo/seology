# Timeline Feature - Quick Start Guide

## Accessing the Timeline

Navigate to: `/shopify/timeline?shop={your-shop}.myshopify.com`

Or use the navigation menu: **Dashboard → Timeline**

## Key Features at a Glance

### 1. Create a Checkpoint
**When to use**: Before making major changes, daily snapshots, or milestone markers

**How to**:
1. Click **"Create Checkpoint"** button (top right)
2. Enter checkpoint name (e.g., "Before Holiday Campaign")
3. Add optional description
4. Click **"Create"**

**What it saves**:
- Current product count
- Total issues and fixes
- Average SEO score
- Complete state of all fixes

### 2. View Fix History
**Timeline Display**:
- **Purple bookmark icons** = Checkpoints
- **Colored dots** = Individual fixes
  - Blue = Title fixes
  - Purple = Meta tag fixes
  - Green = Image fixes
  - Teal = Alt text fixes
  - Pink = SEO optimizations

**Fix Details**:
- Click any fix to view before/after comparison
- Side-by-side diff viewer shows exactly what changed
- Status badge shows: Applied, Pending, Rolled Back, or Failed

### 3. Filter Timeline
**Search**: Type product name or issue description
**Type Filter**: Show only specific fix types (title, meta, image, etc.)
**Status Filter**: Show only applied, pending, rolled back, or failed fixes
**Group By**: Organize by day, week, or month

### 4. Restore to Checkpoint
**When to use**: Undo all changes made after a specific point

**How to**:
1. Find the checkpoint you want to restore
2. Click **"Restore"** button
3. Confirm the action (this will rollback later fixes)
4. System automatically:
   - Reverts product SEO data in Shopify
   - Marks fixes as "Rolled Back"
   - Reopens related issues

**Warning**: This action affects live Shopify data. Use with caution.

### 5. Create a Branch
**When to use**: Test experimental changes without affecting main timeline

**How to**:
1. Find checkpoint to branch from
2. Click **"Branch"** button
3. Enter branch name (e.g., "A/B Test Version")
4. New branch timeline is created

**Benefits**:
- Safe experimentation
- Compare approaches
- No risk to main timeline

### 6. Export Timeline
**How to**: Click **"Export"** button (top right)

**What you get**: JSON file with:
- All fixes with timestamps
- All checkpoints with statistics
- Complete before/after states
- Issue relationships

**Use cases**:
- Backup before major changes
- Share with team
- External analysis

## Impact Indicators

Each fix shows estimated impact:

- **↑ Green arrow** = High impact (significant SEO improvement)
- **→ Yellow line** = Medium impact (moderate improvement)
- **↓ Gray arrow** = Low impact (minor improvement)

## Status Badges

- **✓ Applied** (Green) = Successfully applied to live site
- **⟲ Rolled Back** (Orange) = Reverted to previous state
- **⚠ Pending** (Yellow) = Waiting for approval or execution
- **✗ Failed** (Red) = Application failed (check error logs)

## Best Practices

### Daily Workflow
1. **Morning**: Create checkpoint "Daily Start - {date}"
2. **Work**: Make SEO fixes throughout day
3. **Evening**: Review timeline, verify changes
4. **If issues**: Restore to morning checkpoint

### Before Major Changes
1. Create checkpoint with descriptive name
2. Make changes
3. Monitor results for 24-48 hours
4. If unsuccessful, restore to checkpoint

### A/B Testing
1. Create checkpoint "Pre-Test Baseline"
2. Branch to "Test Version A"
3. Branch again to "Test Version B"
4. Compare results
5. Restore to winner's checkpoint

### Monthly Archiving
1. At month-end, export timeline
2. Store JSON file for records
3. Create checkpoint "End of {Month}"
4. Old checkpoints auto-expire after 90 days

## Keyboard Shortcuts (Planned)

- `j` - Next fix
- `k` - Previous fix
- `c` - Create checkpoint
- `e` - Export timeline
- `f` - Focus search
- `Esc` - Close modals

## Troubleshooting

### "Shop not connected" error
- Verify shop parameter in URL
- Check Shopify OAuth connection in Settings

### Checkpoint not appearing
- Refresh page (timeline fetches on mount)
- Check browser console for errors

### Rollback failed
- Check fix details for error message
- Verify Shopify API permissions
- Some fixes may not be reversible (check fix type)

### Timeline loading slowly
- Consider filtering by date range
- Server-side pagination coming soon for large datasets

## API Usage

For programmatic access:

```bash
# Get timeline data
GET /api/shopify/timeline?shop={shop}

# Create checkpoint
POST /api/shopify/checkpoints
{
  "shop": "mystore.myshopify.com",
  "name": "Checkpoint Name",
  "description": "Optional description"
}

# Restore checkpoint
POST /api/shopify/checkpoints/{checkpointId}/restore
{
  "shop": "mystore.myshopify.com"
}

# Create branch
POST /api/shopify/checkpoints/{checkpointId}/branch
{
  "shop": "mystore.myshopify.com",
  "branchName": "Branch Name"
}
```

## Visual Guide

```
Timeline View:
┌────────────────────────────────────────────────┐
│ [Search] [Type▾] [Status▾] [Group▾] [Export]  │
├────────────────────────────────────────────────┤
│                                                 │
│  ●──── Vertical timeline line                  │
│  │                                              │
│  ⬤  🔖 Checkpoint: "Pre-Launch"                │
│  │     Stats: 250 products, 45 issues          │
│  │     [Restore] [Branch]                      │
│  │                                              │
│  ●  • Title Fix - Product A                    │
│  │    ↑ High Impact | ✓ Applied                │
│  │    Jan 15, 2024 2:30 PM                     │
│  │                                              │
│  ●  • Image Alt Text - Product B               │
│  │    → Medium Impact | ✓ Applied              │
│  │    Jan 15, 2024 2:25 PM                     │
│  │                                              │
│  ⬤  🔖 Checkpoint: "Daily Backup"              │
│       [Restore] [Branch]                       │
│                                                 │
└────────────────────────────────────────────────┘
```

## Support

For issues or questions:
- Check `/shopify/support` page
- Review audit logs in Settings
- Contact SEOLOGY.AI support

---

**Pro Tip**: Create checkpoints before major campaigns, seasonal changes, or bulk operations. The 90-day window gives you plenty of time to evaluate results and rollback if needed.
