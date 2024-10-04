<script>
  import "../app.css";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import { Menu, Home, Info, Briefcase, LogIn, Candy } from "lucide-svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { afterNavigate } from "$app/navigation";
  import { Separator } from "$lib/components/ui/separator";

  $: pageTitle = $page.url.pathname === "/" ? "Home" : "Red Candy";
  let isSheetOpen = false;

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "About", icon: Info },
    { label: "Projects", icon: Briefcase },

    { label: "Candy", icon: Candy, href: "/candy" },
  ];

  afterNavigate(() => {
    isSheetOpen = false;
  });
</script>

<nav class="bg-background p-4 flex justify-between items-center shadow-sm">
  <div class="flex items-center">
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/027/971/388/small_2x/3d-render-round-warm-orange-fire-flame-icon-realistic-hot-sparks-light-gas-logo-design-for-emoticon-energy-power-ui-png.png"
      alt="Logo"
      class="h-8 w-auto mr-4"
    />
    <Button
      variant="ghost"
      class="md:hidden"
      on:click={() => (isSheetOpen = true)}
      aria-label="Open menu"
    >
      <Menu size={24} />
    </Button>
    <div class="hidden md:flex items-center space-x-4">
      {#each navItems as item}
        <Button
          variant="ghost"
          class="flex items-center gap-2"
          href={item.href}
        >
          <svelte:component this={item.icon} size={18} />
          {item.label}
        </Button>
      {/each}
    </div>
  </div>

  <div class="flex items-center space-x-4">
    <Button
      variant="outline"
      class="hidden md:inline-flex items-center gap-2"
      href="/account/login"
    >
      <LogIn size={18} />
      Login
    </Button>
    <ThemeToggle />
  </div>
</nav>

<Separator />

<Sheet.Root bind:open={isSheetOpen}>
  <Sheet.Content side="left" class="w-[250px] sm:w-[300px]">
    <Sheet.Header>
      <Sheet.Title>Menu</Sheet.Title>
      <Sheet.Description>Navigate through our app</Sheet.Description>
    </Sheet.Header>
    <div class="py-4">
      {#each navItems as item}
        <Button
          variant="ghost"
          class="w-full text-left mb-2 flex items-center gap-2"
          href={item.href}
        >
          <svelte:component this={item.icon} size={18} />
          {item.label}
        </Button>
      {/each}
      <Button
        variant="outline"
        class="w-full mb-2 flex items-center gap-2"
        href="/account/login"
      >
        <LogIn size={18} />
        Login
      </Button>
    </div>
    <Sheet.Footer>
      <Button variant="outline" on:click={() => (isSheetOpen = false)}
        >Close</Button
      >
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>

<svelte:head>
  <title>{pageTitle} | Candy Collection App</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground flex flex-col">
  <main class="flex-grow">
    <slot />
  </main>
  <footer class="bg-background p-4 text-center text-sm text-muted-foreground">
    <p>
      &copy; {new Date().getFullYear()} Candy Collection App. All rights reserved.
    </p>
  </footer>
</div>
