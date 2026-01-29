let lockCount = 0;
const CLASS_NAME = "no-scroll";

export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) document.body.classList.add(CLASS_NAME);
}

export function unlockScroll() {
  if (lockCount <= 0) return;
  lockCount -= 1;
  if (lockCount === 0) document.body.classList.remove(CLASS_NAME);
}

// for testing/debugging
export function _getLockCount() {
  return lockCount;
}
