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
    <div
      class="max-w-3xl lg:max-w-5xl mx-auto mb-12 bg-card rounded-xl shadow-lg p-6 lg:p-8"
    >
      <div class="flex items-center mb-4 lg:mb-6">
        <Wand2 class="w-14 h-14 lg:w-8 lg:h-8 mr-2 lg:mr-3 text-primary" />
        <h2 class="text-2xl lg:text-3xl font-semibold">
          Create Your Innovative Design
        </h2>
      </div>
      <Input
        bind:value={prompt}
        placeholder="Describe your visionary UI (e.g., A cutting-edge dashboard for a revolutionary fitness app)"
        class="mb-4 lg:mb-6 lg:text-lg"
      />
      <div class="flex flex-col sm:flex-row gap-4 lg:gap-6">
        <Button variant="outline" class="gap-2 flex-1 sm:flex-none lg:text-lg">
          <Image class="w-4 h-4 lg:w-5 lg:h-5" />
          Upload Inspirational Image
        </Button>
        <div class="flex gap-2 lg:gap-4 flex-1">
          <Button variant="secondary" class="flex-1 lg:text-lg">Swift</Button>
          <Button variant="secondary" class="flex-1 lg:text-lg"
            >Comprehensive</Button
          >
          <Button variant="default" class="gap-2 flex-1 lg:text-lg">
            Innovate
            <ChevronUp class="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- <section class="max-w-3xl mx-auto mb-12 bg-card rounded-xl shadow-lg p-6">
      <div class="flex items-center mb-4">
        <h2 class="text-2xl font-semibold">Visionary Profile</h2>
      </div>
      {#if $user}
        <p>Welcome, esteemed innovator {$user.name || $user.email}!</p>
        {#if $user.avatarUrl}
          <img
            src={$user.avatarUrl}
            alt="Visionary avatar"
            class="w-16 h-16 rounded-full mt-2 border-2 border-primary"
          />
        {/if}
      {:else}
        <p>
          You haven't unlocked your full potential yet. <a
            href="/account/login"
            class="text-primary hover:underline font-bold"
            >Embark on your journey here</a
          >.
        </p>
      {/if}
    </section> -->

    <div class="flex flex-wrap justify-center gap-4 mb-16">
      <Button variant="outline" class="rounded-full text-primary"
        >Disruptive E-commerce</Button
      >
      <Button variant="outline" class="rounded-full text-primary"
        >Revolutionary Landing Page</Button
      >
      <Button variant="outline" class="rounded-full text-primary"
        >Futuristic Dashboard</Button
      >
      <Button variant="outline" class="rounded-full text-primary"
        >Next-Gen Mobile App</Button
      >
    </div>

    <section class="bg-card rounded-xl shadow-lg p-6 mb-12">
      <h2 class="text-3xl font-bold mb-6">Explore Groundbreaking Designs</h2>
      <Tabs value="new">
        <TabsList class="w-full md:w-2/3 lg:w-1/2 mx-auto mb-6">
          <TabsTrigger value="new" class="flex-1"
            >Cutting-Edge Creations</TabsTrigger
          >
          <TabsTrigger value="featured" class="flex-1"
            >Visionary Designs</TabsTrigger
          >
        </TabsList>
        <TabsContent value="new">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Array(6) as _, index}
              <div
                class="aspect-video rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:scale-105 transition-transform"
              >
                <img
                  src={`https://picsum.photos/seed/${index + 1}/400/225?grayscale`}
                  alt="Innovative black and white design"
                  class="w-full h-full object-cover"
                />
              </div>
            {/each}
          </div>
        </TabsContent>
        <TabsContent value="featured">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Array(6) as _, index}
              <div
                class="aspect-video rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:scale-105 transition-transform"
              >
                <img
                  src={`https://picsum.photos/seed/${index + 7}/400/225?grayscale&blur=2`}
                  alt="Revolutionary red and white design"
                  class="w-full h-full object-cover"
                  style="filter: sepia(100%) hue-rotate(300deg) saturate(300%)"
                />
              </div>
            {/each}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  </main>

  <footer class="bg-card shadow-inner py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          class="text-primary hover:text-primary-dark">Visionary FAQ</Button
        >
        <Button
          variant="ghost"
          size="sm"
          class="text-primary hover:text-primary-dark"
          >Innovative Terms of Service</Button
        >
        <Button
          variant="ghost"
          size="sm"
          class="text-primary hover:text-primary-dark"
          >Cutting-Edge AI Ethics</Button
        >
        <Button
          variant="ghost"
          size="sm"
          class="text-primary hover:text-primary-dark"
          >Next-Gen Privacy Policy</Button
        >
      </div>
    </div>
  </footer>
</div>
