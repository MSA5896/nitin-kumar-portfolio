/**
 * Builds the site for GitHub Pages and publishes dist/ to the `gh-pages` branch
 * of the repository's `origin` remote.
 *
 * Usage:  npm run deploy
 * Needs:  git, an `origin` remote you can push to, and Pages set to serve the
 *         gh-pages branch (Settings -> Pages).
 */
import { execFileSync } from 'node:child_process'
import { rmSync, writeFileSync } from 'node:fs'

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts })
const out = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', shell: process.platform === 'win32', ...opts }).trim()

const remote = out('git', ['remote', 'get-url', 'origin'])
const name = out('git', ['config', 'user.name']) || 'Portfolio deploy'
const email = out('git', ['config', 'user.email']) || 'deploy@localhost'

run('npm', ['run', 'build:pages'])
writeFileSync('dist/.nojekyll', '')

rmSync('dist/.git', { recursive: true, force: true })
const inDist = { cwd: 'dist' }
run('git', ['init', '-q', '-b', 'gh-pages'], inDist)
run('git', ['add', '-A'], inDist)
run('git', ['-c', `user.name=${name}`, '-c', `user.email=${email}`, 'commit', '-q', '-m', 'Deploy site'], inDist)
run('git', ['push', '-f', remote, 'gh-pages'], inDist)
rmSync('dist/.git', { recursive: true, force: true })
console.log('\nDeployed to the gh-pages branch. GitHub Pages updates in about a minute.')
