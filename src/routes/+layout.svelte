<script>
  import "../app.css";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import {
    Menu,
    Home,
    LogIn,
    Candy,
    LogOut,
    Swords,
    QrCode,
  } from "lucide-svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { afterNavigate } from "$app/navigation";
  import { Separator } from "$lib/components/ui/separator";
  import { user } from "$lib/stores/user.store";

  $: pageTitle = $page.url.pathname === "/" ? "Home" : "Red Candy";
  let isSheetOpen = false;

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Candy", icon: Candy, href: "/candy" },
    { label: "Clash", icon: Swords, href: "/clash" },
    { label: "QR Code", icon: QrCode, href: "/qrcode" },
  ];

  afterNavigate(() => {
    isSheetOpen = false;
  });
</script>

<nav class="bg-background p-4 flex justify-between items-center shadow-sm">
  <div class="flex items-center">
    <a href="/" class="flex items-center">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/027/971/388/small_2x/3d-render-round-warm-orange-fire-flame-icon-realistic-hot-sparks-light-gas-logo-design-for-emoticon-energy-power-ui-png.png"
        alt="Logo"
        class="h-8 w-auto mr-4"
      />
    </a>
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
    {#if $user}
      <div class="hidden md:flex items-center space-x-3">
        <div class="relative">
          {#if $user.avatarUrl}
            <img
              src={$user.avatarUrl}
              alt="User avatar"
              class="w-10 h-10 rounded-full border-2 border-primary"
            />
          {:else}
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center font-bold text-lg"
            >
              {$user.email[0].toUpperCase()}
            </div>
          {/if}
          <div
            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
          ></div>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold">{$user.name || "User"}</span>
          <span class="text-xs text-muted-foreground">{$user.email}</span>
        </div>
      </div>
    {/if}
    <Button
      variant="ghost"
      class="md:hidden"
      on:click={() => (isSheetOpen = true)}
      aria-label="Open menu"
    >
      <Menu size={24} />
    </Button>
    {#if $user}
      <form action="/account/logout" method="POST" class="hidden md:block">
        <Button variant="outline" type="submit" class="flex items-center gap-2">
          <LogOut size={18} />
          Logout
        </Button>
      </form>
    {:else}
      <Button
        variant="outline"
        class="hidden md:inline-flex items-center gap-2"
        href="/account/login"
      >
        <LogIn size={18} />
        Login
      </Button>
    {/if}
    <div class="hidden md:block">
      <ThemeToggle />
    </div>
  </div>
</nav>

<Separator />

<Sheet.Root bind:open={isSheetOpen}>
  <Sheet.Content side="right" class="w-[250px] sm:w-[300px] bg-card">
    <Sheet.Header class="border-b border-border p-4">
      <Sheet.Title class="text-xl font-bold">Menu</Sheet.Title>
      <Sheet.Description class="text-sm text-muted-foreground">
        Explore our app
      </Sheet.Description>
    </Sheet.Header>
    <nav class="p-4 space-y-2">
      {#if $user}
        <div class="flex items-center space-x-2 mb-4">
          {#if $user.avatarUrl}
            <img
              src={$user.avatarUrl}
              alt="User avatar"
              class="w-8 h-8 rounded-full"
            />
          {:else}
            <div
              class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center"
            >
              {$user.email[0].toUpperCase()}
            </div>
          {/if}
          <span class="text-sm md:text-base truncate">{$user.email}</span>
        </div>
      {/if}
      {#each navItems as item}
        <a
          href={item.href}
          class="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors duration-200"
        >
          <svelte:component this={item.icon} size={20} class="text-primary" />
          <span>{item.label}</span>
        </a>
      {/each}
      <Separator class="my-4" />
      {#if $user}
        <form action="/account/logout" method="POST">
          <Button
            variant="ghost"
            type="submit"
            class="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut size={20} class="mr-3" />
            Logout
          </Button>
        </form>
      {:else}
        <Button
          variant="ghost"
          class="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
          href="/account/login"
        >
          <LogIn size={20} class="mr-3" />
          Login
        </Button>
      {/if}
    </nav>
    <div class="absolute bottom-4 left-4 right-4">
      <Separator class="mb-4" />
      <div class="flex justify-between items-center">
        <ThemeToggle />
        <Button
          variant="outline"
          size="sm"
          on:click={() => (isSheetOpen = false)}
        >
          Close
        </Button>
      </div>
    </div>
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
