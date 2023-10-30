<script lang="ts">
  import { checkGrid } from "./lib/game";
  import { emptyGrid, initialGrid } from "./lib/grid";

  let isPlaying = true;
  let loopTimeout: number;

  let grid = initialGrid();
  let game = grid;
  let generations = 0;
  let period = 2;
  function loop() {
    loopTimeout = setTimeout(() => {
      game = checkGrid(grid);
      generations++;
      if(generations % period === 0) {
        grid = game;
      }
      loop();
    }, 100/period);
  }

  loop();

  function playPause(playing = !isPlaying) {
    clearInterval(loopTimeout);
    isPlaying = playing;
    if (isPlaying) loop();
  }

  let drawing = false;
  function handleMove(e: MouseEvent) {
    if(isPlaying || !drawing) return;
    const {row, col} = (e.target as HTMLDivElement)?.dataset;
    if(!col || !row) return;
    const [i, j] = [+row, +col];
    grid[i][j] = grid[i][j] === 0? 1: 0;
  }

  function reset() {
    grid = initialGrid();
    generations = 0;
  }

  function empty() {
    grid = emptyGrid();
    playPause(false);
    generations = 0;
  }
</script>

<main on:pointerover={handleMove} on:pointerdown={() => drawing = true} on:pointerup={() => drawing = false}>
  {#each grid as row, rowIndex}
    <div class="row">
      {#each row as col, colIndex}
        <div
          class="col {col > 0 ? 'filled' : ''}"
          data-row={rowIndex}
          data-col={colIndex}
        />
      {/each}
    </div>
  {/each}
</main>
<div class="actions">
  <h3>{generations} Generations</h3>
  <label for="">
    Period
    <input type="text" bind:value={period}>
  </label>
  <button on:click={() => playPause()}>{isPlaying ? "Pause" : "Play"}</button>
  <button on:click={reset}>Reset</button>
  <button on:click={empty}>Empty</button>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
  }

  .col {
    height: 5px;
    width: 5px;
    border: 0.3px solid rgba(255, 0, 0, 0.4);
  }

  .filled {
    background-color: black;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
  }

  .actions {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    box-sizing: border-box;
  }

  .actions button{
    cursor: pointer;
    padding: 10px 20px;
    margin: 5px;
  }
</style>
