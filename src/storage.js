const KEY = 'dashboard:envs'

export function loadEnvs() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('loadEnvs failed', e)
    return null
  }
}

export function saveEnvs(envs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(envs))
  } catch (e) {
    console.warn('saveEnvs failed', e)
  }
}

export function clearEnvs() {
  try { localStorage.removeItem(KEY) } catch(e){}
}
