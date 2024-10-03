<script>
  export let data;
  import { invalidateAll } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardFooter } from "$lib/components/ui/card";
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";

  import * as Dialog from "$lib/components/ui/dialog/index.js";

  let open = false;

  let newCandy = { name: "", age: "" };

  async function handleSubmit() {
    if (!newCandy.name.trim() || !newCandy.age.trim()) {
      alert("🚨 Please fill in both name and age fields.");
      return;
    }

    const response = await fetch("/api/candy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCandy),
    });

    if (response.ok) {
      newCandy = { name: "", age: "" };
      await invalidateAll();
      open = false;
    } else {
      console.error("🚫 Failed to add candy");
      alert("🚫 Failed to add candy. Please try again.");
    }
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/candy/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await invalidateAll();
    } else {
      console.error("🚫 Failed to delete candy");
      alert("🚫 Failed to delete candy. Please try again.");
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>🎉 Add New Candy</Dialog.Title>
      <Dialog.Description
        >Enter the details of the new candy.</Dialog.Description
      >
    </Dialog.Header>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="name">👀 Name</Label>
          <Input
            id="name"
            bind:value={newCandy.name}
            placeholder="Candy name"
            required
            aria-label="Candy name"
          />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="age">🎂 Age</Label>
          <Input
            id="age"
            bind:value={newCandy.age}
            placeholder="Candy age"
            required
            type="number"
            aria-label="Candy age"
          />
        </div>
      </div>
      <Dialog.Footer class="mt-4">
        <Button
          type="submit"
          disabled={!newCandy.name.trim() || !newCandy.age.trim()}
        >
          🚀 Add Candy
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

<svelte:head>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Candy Collection App",
      "description": "Explore our delightful candy collection app. Add, view, and manage your favorite candies with ease.",
      "url": "https://your-website-url.com",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All"
    }
  </script>
</svelte:head>

<h1
  class="text-3xl md:text-4xl font-bold text-center my-6 md:my-8 text-primary"
>
  🍭 Candy Collection
</h1>

<div class="p-4 max-w-7xl mx-auto">
  <div class="flex justify-center items-center mb-6 md:mb-8">
    <Dialog.Root bind:open>
      <Dialog.Trigger asChild let:builder>
        <Button
          variant="default"
          builders={[builder]}
          class="text-lg font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >🍭 Add New Candy</Button
        >
      </Dialog.Trigger>
    </Dialog.Root>
  </div>

  <div class="mt-6 md:mt-8">
    <h2 class="text-xl md:text-2xl font-bold mb-4 text-center">
      🍬 Candy List
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each data.candies as candy (candy._id)}
        <div animate:flip={{ duration: 300 }}>
          <div
            in:fade|local={{ duration: 300 }}
            out:slide|local={{ duration: 300, y: -20 }}
          >
            <Card
              class="rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur-sm"
            >
              <CardContent class="pt-4 md:pt-6">
                <p class="text-base md:text-lg font-bold text-primary">
                  {candy.name}
                </p>
                <p class="text-sm md:text-base text-muted-foreground">
                  Age: {candy.age}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  size="sm"
                  on:click={() => handleDelete(candy._id)}
                  class="w-full md:w-auto"
                >
                  🗑️ Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
