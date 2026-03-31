'use client'

import { useContext, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { DContext } from '../../context/Datacontext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuth, handleLogout } = useContext(DContext)

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 shadow-2xl border-b border-slate-800 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <a href="/" className="flex items-center gap-3 group">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 flex items-center justify-center text-white font-black text-lg shadow-xl transition-transform duration-300 group-hover:-translate-y-0.5">
            SM
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-white">Shoe Monitoring</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-medium">Smart footwear telemetry</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200">Dashboard</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = '/login')}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-100 hover:bg-slate-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="md:hidden">
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm" aria-hidden="true" />
        <DialogPanel className="fixed right-0 top-0 h-full w-full max-w-sm bg-slate-950 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-lg font-bold text-white">Shoe Monitoring</p>
              <p className="text-sm text-slate-400">Mobile menu</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-3 mb-8">
            <a href="/" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition-colors">Dashboard</a>
          </div>

          <div>
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="w-full rounded-2xl bg-red-600 hover:bg-red-700 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = '/login')}
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

