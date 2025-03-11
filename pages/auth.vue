<template>
  <div
    class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r dark:border-zinc-900 z-40">
      <div class="absolute inset-0 h-full w-full z-30">
        <div class="flex h-full justify-center items-center space-x-4 mx-auto z-50">
          <div class="text-left m-10">
            <h2 class="text-5xl text-white font-bold relative">
              <span class="text-orange-500">Commodities Distribution Platform</span><br />
            </h2>
          </div>
        </div>
      </div>
      <div class="absolute h-full w-full inset-0 z-20 bg-zinc-900 overflow-hidden">
        <HomeScreenNoise class="opacity-90" />
        <HomeScreenGradient />
      </div>
      <StructureLogo />

    </div>
    <div class="lg:p-8 relative">
      <NuxtPage />
    </div>
  </div>
</template>
