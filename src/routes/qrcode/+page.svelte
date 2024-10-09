<script>
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";

  export let data;

  let newQRCode = "";
  let editingQRCode = null;

  function startEditing(qrcode) {
    editingQRCode = { ...qrcode };
  }

  function cancelEditing() {
    editingQRCode = null;
  }

  const baseUrl = "https://light.redruby.one/api/files/uwc8owmvismuiqj/";

  function validateUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    try {
      new URL(url);
      return url;
    } catch (e) {
      return false;
    }
  }

  function handleSubmit(event) {
    const form = event.target;
    const linkInput = form.elements.link;
    const validatedUrl = validateUrl(linkInput.value);
    if (validatedUrl) {
      linkInput.value = validatedUrl;
    } else {
      event.preventDefault();
      alert("Please enter a valid URL");
    }
  }
</script>

<svelte:head>
  <title>QR Code Generator</title>
</svelte:head>

<div class="container mx-auto p-4 space-y-8">
  <Card>
    <CardHeader>
      <CardTitle>Create New QR Code</CardTitle>
    </CardHeader>
    <CardContent>
      <form
        method="POST"
        action="?/create"
        use:enhance
        on:submit={handleSubmit}
        class="space-y-4"
      >
        <div class="space-y-2">
          <Label for="newQRCode">Enter URL for QR Code</Label>
          <Input
            type="text"
            id="newQRCode"
            name="link"
            bind:value={newQRCode}
            placeholder="e.g., google.com or https://www.example.com"
            required
          />
        </div>
        <Button type="submit">Generate QR Code</Button>
      </form>
    </CardContent>
  </Card>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.qrcodes as qrcode (qrcode.id)}
      <Card>
        <CardHeader></CardHeader>
        <CardContent class="space-y-4">
          <img
            src={baseUrl + qrcode.id + "/" + qrcode.qrcode}
            alt={qrcode.link}
            class="w-full max-w-[200px] mx-auto"
          />
          <p class="text-sm text-center">Scan to visit: {qrcode.link}</p>
        </CardContent>
        <CardFooter class="flex justify-between">
          {#if editingQRCode && editingQRCode.id === qrcode.id}
            <form
              method="POST"
              action="?/update"
              use:enhance
              on:submit={(event) => {
                handleSubmit(event);
                editingQRCode = null;
              }}
              class="w-full space-y-4"
            >
              <input type="hidden" name="id" value={qrcode.id} />
              <Input
                type="text"
                name="link"
                value={editingQRCode.link}
                required
                placeholder="e.g., google.com or https://www.example.com"
              />
              <div class="flex justify-between">
                <Button type="submit" variant="outline">Save</Button>
                <Button type="button" variant="ghost" on:click={cancelEditing}
                  >Cancel</Button
                >
              </div>
            </form>
          {:else}
            <Button variant="outline" on:click={() => startEditing(qrcode)}
              >Edit</Button
            >
            <form method="POST" action="?/delete" use:enhance>
              <input type="hidden" name="id" value={qrcode.id} />
              <Button type="submit" variant="destructive">Delete</Button>
            </form>
          {/if}
        </CardFooter>
      </Card>
    {/each}
  </div>
</div>
