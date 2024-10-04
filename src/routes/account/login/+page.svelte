<script>
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import { AlertCircle } from "lucide-svelte";

  $: errorMessage = $page.url.searchParams.get("error");
</script>

<div class="container mx-auto mt-8">
  <Card class="w-[350px] mx-auto">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Choose your login method</CardDescription>
    </CardHeader>
    <CardContent>
      <form action="?/google" method="POST">
        <Button type="submit" class="w-full">Login with Google</Button>
      </form>
    </CardContent>
    <CardFooter>
      {#if errorMessage}
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      {/if}
    </CardFooter>
  </Card>
</div>
