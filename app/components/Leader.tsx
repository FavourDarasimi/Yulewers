/**
 * The menu's price leader, reused wherever a label and its value sit at
 * opposite ends of a line — dishes, the hire rider, the good-to-know list.
 */
export default function Leader() {
  return (
    <span
      aria-hidden
      className="mx-3 h-px flex-1 -translate-y-[0.35em] bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_1px,transparent_1px_5px)] opacity-40"
    />
  );
}
