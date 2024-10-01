<script>
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button";

  let isDark = false;

  onMount(() => {
    isDark = document.body.classList.contains("dark");
  });

  function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle("dark", isDark);
  }
</script>

<Button on:click={toggleTheme}>
  {isDark ? "☀️" : "🌙"}
</Button>
