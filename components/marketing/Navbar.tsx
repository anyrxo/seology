'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <div id="top" className="navbar w-nav">
      <div className="padding-global">
        <div className="container-large">
          <div className="w-layout-grid nav-component-grid">
            <Link href="/" className="brand-link w-inline-block">
              <div className="logo-wrap">
                <div className="text-2xl font-bold text-white">SEOLOGY<span className="text-color-secondary">.AI</span></div>
              </div>
            </Link>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <div className="background-navbar">
                <div className="nav-square"></div>
              </div>
              <div className="nav-menu-content">
                <div className="left-nav-menu">
                  <div className="nav-link-overflow">
                    <Link href="/" className="nav-link w-inline-block">
                      <div className="nav-link-block">
                        <div className="nav-text">Home</div>
                        <div className="nav-text is-hover">Home</div>
                      </div>
                    </Link>
                  </div>
                  <div className="nav-link-overflow">
                    <Link href="/how-it-works" className="nav-link w-inline-block">
                      <div className="nav-link-block">
                        <div className="nav-text">How It Works</div>
                        <div className="nav-text is-hover">How It Works</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="right-nav-menu">
                  <div className="nav-link-overflow">
                    <Link href="/pricing" className="nav-link w-inline-block">
                      <div className="nav-link-block">
                        <div className="nav-text">Pricing</div>
                        <div className="nav-text is-hover">Pricing</div>
                      </div>
                    </Link>
                  </div>
                  <div className="nav-link-overflow">
                    <Link href="/contact" className="nav-link w-inline-block">
                      <div className="nav-link-block">
                        <div className="nav-text">Contact</div>
                        <div className="nav-text is-hover">Contact</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <div className="menu-button w-nav-button">
              <div className="menu-button-block">
                <div className="menu-button-wrap">
                  <div className="menu-line-item">
                    <div className="menu-line top"></div>
                  </div>
                  <div className="menu-line-item">
                    <div className="menu-line bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
