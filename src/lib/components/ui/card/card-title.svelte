<script>
  import { cn } from "$lib/utils.js";
  let className = undefined;
  export let tag = undefined;
  export { className as class };
</script>

<svelte:element
  this={tag || "div"}
  class={cn("font-semibold leading-none tracking-tight", className)}
  {...$$restProps}
>
  <slot />
</svelte:element>
