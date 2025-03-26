import { assertEquals } from "@std/assert";
import { Value } from "./main.ts";

Deno.test(function half_plus_third() {
  assertEquals(Value.add(new Value("1/2"), new Value("1/3")), new Value("5/6"));
});
Deno.test(function two_thirds_plus_third() {
  assertEquals(Value.add(new Value("2/3"), new Value("1/3")), new Value("1"));
});
Deno.test(function three_halves_plus_third() {
  assertEquals(Value.add(new Value("3/2"), new Value("1/3")), new Value("1 5/6"));
});

