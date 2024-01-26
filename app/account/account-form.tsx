'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user!.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <TextInput id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <TextInput
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e: any) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <TextInput
          id="username"
          type="text"
          value={username || ''}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <Button className="button block" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  )
}