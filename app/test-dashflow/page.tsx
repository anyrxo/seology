/**
 * Dashflow X Component Test Page
 * Visual verification that all Dashflow X classes work correctly
 */

export default function TestDashflowPage() {
  return (
    <div className="bg-neutral-200" style={{ minHeight: '100vh', padding: '40px' }}>
      <div className="container-default w-container">
        <div className="grid-1-column gap-row-48px">
          {/* Header */}
          <div className="card pd-32px---44px">
            <h1 className="display-1 color-neutral-800 mg-bottom-16px">
              Dashflow X Component Test
            </h1>
            <p className="text-200 color-neutral-600">
              This page tests all Dashflow X CSS components to ensure proper loading and styling.
            </p>
          </div>

          {/* Buttons */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Buttons</h2>
            <div className="flex-horizontal gap-column-12px">
              <button className="btn-primary">Primary</button>
              <button className="btn-primary large">Large Primary</button>
              <button className="btn-primary white">White Primary</button>
              <button className="btn-secondary">Secondary</button>
              <button className="btn-primary disabled">Disabled</button>
            </div>
          </div>

          {/* Badges */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Badges</h2>
            <div className="flex-horizontal gap-column-12px">
              <div className="badge green">
                <div className="text-50 medium">Green</div>
              </div>
              <div className="badge blue">
                <div className="text-50 medium">Blue</div>
              </div>
              <div className="badge red">
                <div className="text-50 medium">Red</div>
              </div>
              <div className="badge orange">
                <div className="text-50 medium">Orange</div>
              </div>
              <div className="badge primary">
                <div className="text-50 medium">Primary</div>
              </div>
              <div className="badge neutral">
                <div className="text-50 medium">Neutral</div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Typography</h2>
            <div className="flex-vertical gap-row-16px">
              <div className="display-1 color-neutral-800">Display 1 (48px)</div>
              <div className="display-2 color-neutral-800">Display 2 (40px)</div>
              <div className="display-3 color-neutral-800">Display 3 (36px)</div>
              <div className="text-600 bold color-neutral-800">Text 600 (30px)</div>
              <div className="text-500 bold color-neutral-800">Text 500 (24px)</div>
              <div className="text-400 color-neutral-800">Text 400 (20px)</div>
              <div className="text-300 color-neutral-800">Text 300 (18px)</div>
              <div className="text-200 color-neutral-800">Text 200 (16px)</div>
              <div className="text-100 color-neutral-800">Text 100 (14px)</div>
              <div className="text-50 color-neutral-800">Text 50 (12px)</div>
            </div>
          </div>

          {/* Card Padding Variants */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Card Padding Variants</h2>
            <div className="grid-3-columns gap-row-24px gap-column-12px">
              <div className="card pd-16px">
                <div className="text-100 medium color-neutral-600 mg-bottom-8px">pd-16px</div>
                <div className="text-50 color-neutral-500">Smallest padding</div>
              </div>
              <div className="card pd-24px">
                <div className="text-100 medium color-neutral-600 mg-bottom-8px">pd-24px</div>
                <div className="text-50 color-neutral-500">Standard padding</div>
              </div>
              <div className="card pd-22px---18px">
                <div className="text-100 medium color-neutral-600 mg-bottom-8px">pd-22px---18px</div>
                <div className="text-50 color-neutral-500">Medium padding</div>
              </div>
              <div className="card pd-24px---18px">
                <div className="text-100 medium color-neutral-600 mg-bottom-8px">pd-24px---18px</div>
                <div className="text-50 color-neutral-500">Large padding</div>
              </div>
              <div className="card pd-32px---24px">
                <div className="text-100 medium color-neutral-600 mg-bottom-8px">pd-32px---24px</div>
                <div className="text-50 color-neutral-500">Extra large padding</div>
              </div>
              <div className="card pd-32px---44px">
                <div className="text-100 medium color-neutral-600 mg-bottom-8px">pd-32px---44px</div>
                <div className="text-50 color-neutral-500">Largest padding</div>
              </div>
            </div>
          </div>

          {/* Icon Squares */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Icon Squares</h2>
            <div className="flex-horizontal gap-column-24px align-center">
              <div>
                <div className="card-icon-square _26px mg-bottom-8px">
                  <div className="text-100">🎯</div>
                </div>
                <div className="text-50 color-neutral-600 text-center">26px</div>
              </div>
              <div>
                <div className="card-icon-square _40px mg-bottom-8px">
                  <div className="text-200">🎯</div>
                </div>
                <div className="text-50 color-neutral-600 text-center">40px</div>
              </div>
              <div>
                <div className="card-icon-square _26px neutral-icon mg-bottom-8px">
                  <div className="text-100">🎯</div>
                </div>
                <div className="text-50 color-neutral-600 text-center">Neutral</div>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Stats Cards (4-Column Grid)</h2>
            <div className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px">
              {/* Stats Card 1 */}
              <div className="card pd-24px hover-card-link">
                <div className="flex-horizontal space-between align-center mg-bottom-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-200">🌐</div>
                  </div>
                  <div className="badge green">
                    <div className="text-50 medium">Active</div>
                  </div>
                </div>
                <div className="flex-vertical gap-row-12px">
                  <div className="text-100 medium color-neutral-600">Sites Connected</div>
                  <div className="card-amount-container green">
                    <div className="display-2 color-neutral-800">8</div>
                  </div>
                </div>
              </div>

              {/* Stats Card 2 */}
              <div className="card pd-24px hover-card-link">
                <div className="flex-horizontal space-between align-center mg-bottom-16px">
                  <div className="card-icon-square _40px neutral-icon">
                    <div className="text-200">🔍</div>
                  </div>
                  <div className="badge red">
                    <div className="text-50 medium">Alert</div>
                  </div>
                </div>
                <div className="flex-vertical gap-row-12px">
                  <div className="text-100 medium color-neutral-600">Issues Detected</div>
                  <div className="card-amount-container red">
                    <div className="display-2 color-neutral-800">23</div>
                  </div>
                </div>
              </div>

              {/* Stats Card 3 */}
              <div className="card pd-24px hover-card-link">
                <div className="flex-horizontal space-between align-center mg-bottom-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-200">✅</div>
                  </div>
                  <div className="badge blue">
                    <div className="text-50 medium">This month</div>
                  </div>
                </div>
                <div className="flex-vertical gap-row-12px">
                  <div className="text-100 medium color-neutral-600">Fixes Applied</div>
                  <div className="card-amount-container green">
                    <div className="display-2 color-neutral-800">156</div>
                  </div>
                </div>
              </div>

              {/* Stats Card 4 */}
              <div className="card pd-24px hover-card-link">
                <div className="flex-horizontal space-between align-center mg-bottom-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-200">📊</div>
                  </div>
                  <div className="badge orange">
                    <div className="text-50 medium">75%</div>
                  </div>
                </div>
                <div className="flex-vertical gap-row-12px">
                  <div className="text-100 medium color-neutral-600">Usage</div>
                  <div className="card-amount-container green">
                    <div className="display-2 color-neutral-800">75%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Progress Bars</h2>
            <div className="flex-vertical gap-row-24px">
              <div>
                <div className="flex-horizontal space-between mg-bottom-8px">
                  <div className="text-100 medium color-neutral-600">Green Progress</div>
                  <div className="text-100 color-neutral-600">75%</div>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-bg">
                    <div className="progress-bar green" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex-horizontal space-between mg-bottom-8px">
                  <div className="text-100 medium color-neutral-600">Orange Progress</div>
                  <div className="text-100 color-neutral-600">85%</div>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-bg">
                    <div className="progress-bar orange" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex-horizontal space-between mg-bottom-8px">
                  <div className="text-100 medium color-neutral-600">Red Progress</div>
                  <div className="text-100 color-neutral-600">95%</div>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-bg">
                    <div className="progress-bar red" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Variations */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Grid System</h2>
            <div className="flex-vertical gap-row-32px">
              <div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-16px">1 Column Grid</h3>
                <div className="grid-1-column gap-row-12px">
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 1</div>
                  </div>
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 2</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-16px">2 Column Grid</h3>
                <div className="grid-2-columns gap-row-12px gap-column-12px">
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 1</div>
                  </div>
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 2</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-16px">3 Column Grid</h3>
                <div className="grid-3-columns gap-row-12px gap-column-12px">
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 1</div>
                  </div>
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 2</div>
                  </div>
                  <div className="card pd-16px">
                    <div className="text-100 color-neutral-600">Item 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton Loading */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Skeleton Loading States</h2>
            <div className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px">
              <div className="card pd-24px">
                <div className="flex-vertical gap-row-12px">
                  <div className="skeleton-box" style={{ height: '40px', width: '40px', borderRadius: '8px' }} />
                  <div className="skeleton-box" style={{ height: '16px', width: '70%' }} />
                  <div className="skeleton-box" style={{ height: '32px', width: '50%' }} />
                </div>
              </div>
              <div className="card pd-24px">
                <div className="flex-vertical gap-row-12px">
                  <div className="skeleton-box" style={{ height: '40px', width: '40px', borderRadius: '8px' }} />
                  <div className="skeleton-box" style={{ height: '16px', width: '70%' }} />
                  <div className="skeleton-box" style={{ height: '32px', width: '50%' }} />
                </div>
              </div>
              <div className="card pd-24px">
                <div className="flex-vertical gap-row-12px">
                  <div className="skeleton-box" style={{ height: '40px', width: '40px', borderRadius: '8px' }} />
                  <div className="skeleton-box" style={{ height: '16px', width: '70%' }} />
                  <div className="skeleton-box" style={{ height: '32px', width: '50%' }} />
                </div>
              </div>
              <div className="card pd-24px">
                <div className="flex-vertical gap-row-12px">
                  <div className="skeleton-box" style={{ height: '40px', width: '40px', borderRadius: '8px' }} />
                  <div className="skeleton-box" style={{ height: '16px', width: '70%' }} />
                  <div className="skeleton-box" style={{ height: '32px', width: '50%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Form Input */}
          <div className="card pd-32px---24px">
            <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Form Inputs</h2>
            <div className="flex-vertical gap-row-16px">
              <input
                type="text"
                className="input"
                placeholder="Normal input..."
              />
              <input
                type="text"
                className="input"
                value="Filled input"
                readOnly
              />
            </div>
          </div>

          {/* Success Message */}
          <div className="card pd-32px---24px">
            <div className="flex-horizontal gap-column-16px align-center">
              <div className="card-icon-square _40px">
                <div className="text-300">✅</div>
              </div>
              <div className="flex-vertical flex-1">
                <div className="text-200 bold color-neutral-800 mg-bottom-8px">
                  All Dashflow X Components Working!
                </div>
                <div className="text-100 color-neutral-600">
                  All CSS classes are properly loaded and styled. Check the console for any missing resources.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
