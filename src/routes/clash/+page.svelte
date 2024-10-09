<script>
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Progress } from "$lib/components/ui/progress";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import { Skeleton } from "$lib/components/ui/skeleton";

  export let data;

  $: player = data.player;
  $: error = data.error;

  function getProgressColor(value, max) {
    const percentage = (value / max) * 100;
    if (percentage < 33) return "bg-destructive";
    if (percentage < 66) return "bg-warning";
    return "bg-success";
  }
</script>

<div class="container mx-auto p-4 space-y-8">
  {#if error}
    <Card>
      <CardContent>
        <p class="text-destructive">{error}</p>
      </CardContent>
    </Card>
  {:else if player}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle class="flex items-center gap-4">
            <Avatar class="w-16 h-16">
              <AvatarImage
                src={player.league?.iconUrls?.medium}
                alt="League Icon"
              />
              <AvatarFallback>{player.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 class="text-3xl font-bold">{player.name}</h2>
              <p class="text-muted-foreground">{player.tag}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 gap-4">
            {#each [{ label: "Town Hall Level", value: player.townHallLevel }, { label: "Experience Level", value: player.expLevel }, { label: "Trophies", value: player.trophies }, { label: "Best Trophies", value: player.bestTrophies }] as item}
              <div>
                <p class="text-sm text-muted-foreground">{item.label}</p>
                <p class="text-2xl font-semibold">{item.value}</p>
              </div>
            {/each}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clan Info</CardTitle>
        </CardHeader>
        <CardContent>
          {#if player.clan}
            <div class="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage
                  src={player.clan.badgeUrls?.medium}
                  alt="Clan Badge"
                />
                <AvatarFallback>{player.clan.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p class="font-semibold">{player.clan.name}</p>
                <p class="text-sm text-muted-foreground">
                  Level {player.clan.clanLevel}
                </p>
              </div>
            </div>
          {:else}
            <p>Not in a clan</p>
          {/if}
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">War Stars</p>
            <Progress
              value={player.warStars}
              max={1000}
              class={getProgressColor(player.warStars, 1000)}
            />
            <p class="text-right">{player.warStars}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <Tabs defaultValue="troops" class="w-full">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="troops">Troops</TabsTrigger>
        <TabsTrigger value="spells">Spells</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
        <TabsTrigger value="labels">Labels</TabsTrigger>
      </TabsList>
      {#each ["troops", "spells", "achievements", "labels"] as tabValue}
        <TabsContent value={tabValue}>
          <Card>
            <CardHeader>
              <CardTitle
                >{tabValue.charAt(0).toUpperCase() +
                  tabValue.slice(1)}</CardTitle
              >
            </CardHeader>
            <CardContent>
              {#if tabValue === "troops" || tabValue === "spells"}
                <div
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {#each player[tabValue] as item}
                    <div class="flex items-center gap-2">
                      <Badge variant="outline">{item.level}</Badge>
                      <span>{item.name}</span>
                    </div>
                  {/each}
                </div>
              {:else if tabValue === "achievements"}
                <div class="space-y-4">
                  {#each player.achievements as achievement}
                    <div>
                      <div class="flex justify-between items-center mb-1">
                        <span>{achievement.name}</span>
                        <Badge>{achievement.stars} stars</Badge>
                      </div>
                      <Progress
                        value={achievement.value}
                        max={achievement.target}
                        class={getProgressColor(
                          achievement.value,
                          achievement.target
                        )}
                      />
                    </div>
                  {/each}
                </div>
              {:else if tabValue === "labels"}
                <div class="flex flex-wrap gap-2">
                  {#each player.labels as label}
                    <Badge variant="secondary">{label.name}</Badge>
                  {/each}
                </div>
              {/if}
            </CardContent>
          </Card>
        </TabsContent>
      {/each}
    </Tabs>
  {:else}
    <Card>
      <CardContent class="p-4">
        <Skeleton class="w-full h-8 mb-4" />
        <Skeleton class="w-3/4 h-4 mb-2" />
        <Skeleton class="w-1/2 h-4" />
      </CardContent>
    </Card>
  {/if}
</div>
