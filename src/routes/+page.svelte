<script>
  // @ts-nocheck

  export let data;
  import { invalidateAll } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "$lib/components/ui/card";
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";

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
      await invalidateAll(); // This will refresh the page data
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
      await invalidateAll(); // This will refresh the page data
    } else {
      console.error("🚫 Failed to delete candy");
      alert("🚫 Failed to delete candy. Please try again.");
    }
  }
</script>

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

<h1 class="text-4xl font-bold text-center my-8 text-primary">
  🍭 Candy Collection
</h1>

<div class="p-4 max-w-7xl mx-auto">
  <div class="flex justify-center items-center">
    <Card class="w-full md:w-[350px] animate-fade-in">
      <CardHeader>
        <CardTitle>🎉 Add New Candy</CardTitle>
        <CardDescription>Enter the details of the new candy.</CardDescription>
      </CardHeader>
      <CardContent>
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
        </form>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button
          on:click={handleSubmit}
          disabled={!newCandy.name.trim() || !newCandy.age.trim()}
          >🚀 Add Candy</Button
        >
      </CardFooter>
    </Card>
  </div>

  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4 text-center">🍬 Candy List</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each data.candies as candy (candy._id)}
        <div animate:flip={{ duration: 300 }}>
          <div
            in:fade|local={{ duration: 300 }}
            out:slide|local={{ duration: 300, y: -20 }}
          >
            <Card
              class="rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur-sm"
            >
              <CardContent class="pt-6">
                <p class="text-lg font-bold text-primary">{candy.name}</p>
                <p class="text-muted-foreground">Age: {candy.age}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  size="sm"
                  on:click={() => handleDelete(candy._id)}
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
