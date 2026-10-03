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

// npm is a .cmd file on Windows and needs a shell. git does not, and running it without
// one keeps arguments that contain spaces (such as a user name) intact.
const needsShell = (cmd) => cmd === 'npm' && process.platform === 'win32'
const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', shell: needsShell(cmd), ...opts })
const out = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', shell: needsShell(cmd), ...opts }).trim()

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
// Use the GitHub CLI's login for this push only (no global git config is changed),
// and never wait on an invisible password prompt.
run('git', ['-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential', 'push', '-f', remote, 'gh-pages'], {
  ...inDist,
  env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
})
rmSync('dist/.git', { recursive: true, force: true })
console.log('\nDeployed to the gh-pages branch. GitHub Pages updates in about a minute.')
