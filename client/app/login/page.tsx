'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Navbar from "../ui/landingPage/Navbar"

const LoginForm = () => {

  return (
    <>
    <Navbar></Navbar>
    

    <Card className="mx-auto max-w-sm my-24">

      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Sign in with GitHub
          </Button>
        </div>
       
      </CardContent>
    </Card>
    </>
  )
}

export default LoginForm