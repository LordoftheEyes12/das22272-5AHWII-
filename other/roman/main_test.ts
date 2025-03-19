import { assertEquals } from "@std/assert";
import { toRoman, fromRoman } from "main";

Deno.test(function MMMDCCCXCIV_toInt() {
  assertEquals(fromRoman("MMMDCCCXCIV"), 3894);
});
Deno.test(function MMMCMVI_toInt() {
  assertEquals(fromRoman("MMMCMVI"), 3906);
});
Deno.test(function MMMCMLVI_toInt() {
  assertEquals(fromRoman("MMMCMLVI"), 3956);
});
Deno.test(function CLI_toInt() {
  assertEquals(fromRoman("CLI"), 151
  );
});
Deno.test(function CDXLIV_toInt() {
  assertEquals(fromRoman("CDXLIV"), 444);
});
Deno.test(function toRoman_3894() {
  assertEquals(toRoman(3894), "MMMDCCCXCIV");
});
Deno.test(function toRoman_3906() {
  assertEquals(toRoman(3906), "MMMCMVI");
});
Deno.test(function toRoman_3956() {
  assertEquals(toRoman(3956), "MMMCMLVI");
});
Deno.test(function toRoman_151() {
  assertEquals(toRoman(151), "CLI");
});
Deno.test(function toRoman_444() {
  assertEquals(toRoman(444), "CDXLIV");
});



/*
3894 MMMDCCCXCIV
3906 MMMCMVI
3956 MMMCMLVI
151 CLI
444 CDXLIV
*/