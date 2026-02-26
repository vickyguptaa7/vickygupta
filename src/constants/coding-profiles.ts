import type { IconType } from "react-icons";
import {
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
  SiLeetcode,
} from "react-icons/si";

export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  icon: IconType;
  rating?: string;
  ratingColor?: string;
  rank?: string;
}

export const codingProfiles: CodingProfile[] = [
  {
    platform: "Codeforces",
    handle: "vickyguptaa7",
    url: "https://codeforces.com/profile/vickyguptaa7",
    icon: SiCodeforces,
    rating: "Expert",
    ratingColor: "#1a8bbb",
    rank: "1695",
  },
  {
    platform: "LeetCode",
    handle: "vickyguptaa7",
    url: "https://leetcode.com/vickyguptaa7/",
    icon: SiLeetcode,
    rating: "Guardian",
    ratingColor: "#ffa116",
    rank: "2296",
  },
  {
    platform: "CodeChef",
    handle: "vickyguptaa7",
    url: "https://www.codechef.com/users/vickyguptaa7",
    icon: SiCodechef,
    rating: "4 Star",
    ratingColor: "#5b4638",
    rank: "1873",
  },
  {
    platform: "GeeksforGeeks",
    handle: "vickyguptaa7",
    url: "https://www.geeksforgeeks.org/profile/vickyguptaa7?tab=activity",
    icon: SiGeeksforgeeks,
    // rating: "1579",
    rank: "1579",
    ratingColor: "#2f8d46",
  },
];
