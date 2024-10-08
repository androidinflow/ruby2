<script>
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "$lib/components/ui/tabs";
  import { ChevronUp, Image, Wand2 } from "lucide-svelte";
  import { user } from "$lib/stores/user.store";

  let prompt = "";

  $: console.log("Current user:", $user);
</script>

<div class="min-h-screen bg-gradient-to-br from-background to-secondary/10">
  <main class="container mx-auto px-4 py-12">
    <h1
      class="text-4xl sm:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
    >
      AI-Powered UI Generation
    </h1>
    <p class="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
      Transform your ideas into stunning UI designs with the power of AI and
      shadcn/ui components.
    </p>

    <div class="max-w-3xl mx-auto mb-12 bg-card rounded-xl shadow-lg p-6">
      <div class="flex items-center mb-4">
        <Wand2 class="w-6 h-6 mr-2 text-primary" />
        <h2 class="text-2xl font-semibold">Create Your Design</h2>
      </div>
      <Input
        bind:value={prompt}
        placeholder="Describe your UI (e.g., A modern dashboard for a fitness app)"
        class="mb-4"
      />
      <div class="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" class="gap-2 flex-1 sm:flex-none">
          <Image class="w-4 h-4" />
          Upload Image
        </Button>
        <div class="flex gap-2 flex-1">
          <Button variant="secondary" class="flex-1">Rapid</Button>
          <Button variant="secondary" class="flex-1">Detailed</Button>
          <Button variant="default" class="gap-2 flex-1">
            Generate
            <ChevronUp class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>

    <section class="max-w-3xl mx-auto mb-12 bg-card rounded-xl shadow-lg p-6">
      <div class="flex items-center mb-4">
        <h2 class="text-2xl font-semibold">User Information</h2>
      </div>
      {#if $user}
        <p>Welcome, {$user.name || $user.email}!</p>
        {#if $user.avatarUrl}
          <img
            src={$user.avatarUrl}
            alt="User avatar"
            class="w-16 h-16 rounded-full mt-2"
          />
        {/if}
      {:else}
        <p>
          You are not logged in. <a
            href="/account/login"
            class="text-primary hover:underline">Log in here</a
          >.
        </p>
      {/if}
    </section>

    <div class="flex flex-wrap justify-center gap-4 mb-16">
      <Button variant="outline" class="rounded-full">E-commerce</Button>
      <Button variant="outline" class="rounded-full">Landing Page</Button>
      <Button variant="outline" class="rounded-full">Dashboard</Button>
      <Button variant="outline" class="rounded-full">Mobile App</Button>
    </div>

    <section class="bg-card rounded-xl shadow-lg p-6 mb-12">
      <h2 class="text-3xl font-bold mb-6">Explore Designs</h2>
      <Tabs value="new">
        <TabsList class="w-full mb-6">
          <TabsTrigger value="new" class="flex-1">Latest Creations</TabsTrigger>
          <TabsTrigger value="featured" class="flex-1"
            >Featured Designs</TabsTrigger
          >
        </TabsList>
        <TabsContent value="new">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Array(6) as _}
              <div
                class="bg-secondary/20 aspect-video rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              ></div>
            {/each}
          </div>
        </TabsContent>
        <TabsContent value="featured">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Array(6) as _}
              <div
                class="bg-primary/20 aspect-video rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              ></div>
            {/each}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  </main>

  <footer class="bg-card shadow-inner py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-4 mb-4">
        <Button variant="ghost" size="sm">FAQ</Button>
        <Button variant="ghost" size="sm">Terms of Service</Button>
        <Button variant="ghost" size="sm">AI Ethics</Button>
        <Button variant="ghost" size="sm">Privacy Policy</Button>
      </div>
      <p class="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AI UI Generator. All rights reserved.
      </p>
    </div>
  </footer>
</div>
