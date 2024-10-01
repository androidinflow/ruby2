<script>
  import "../app.css";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { page } from "$app/stores";

  $: pageTitle = $page.url.pathname === "/" ? "Home" : "Candy Collection";
</script>

<svelte:head>
  <title>{pageTitle} | Candy Collection App</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
  <header class="p-4">
    <ThemeToggle />
  </header>
  <main>
    <slot />
  </main>
</div>
