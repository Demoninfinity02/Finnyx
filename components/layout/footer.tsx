import Link from 'next/link'
import { BarChart2, Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-20 lg:px-8">
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2">
            <BarChart2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Finnyx</span>
          </Link>
        </div>
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              About
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Blog
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Careers
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Press
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} Finnyx Financial, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}