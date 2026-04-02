import type { UserDto } from "@/types/UserDto";
import React from "react";

export const UserLoggedInContext = React.createContext(null as UserDto | null);
