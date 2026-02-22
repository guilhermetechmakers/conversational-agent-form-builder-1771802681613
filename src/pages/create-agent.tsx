import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Settings, Layers, MessageCircle, Palette, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

const tabs = [
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'fields', icon: Layers, label: 'Fields' },
  { id: 'persona', icon: MessageCircle, label: 'Persona' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
]

export function CreateAgentPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('settings')
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [personaInstructions, setPersonaInstructions] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSlugChange = (value: string) => {
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'))
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slug) handleSlugChange(value)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Mock save
      await new Promise((r) => setTimeout(r, 500))
      toast.success('Agent saved')
      navigate('/dashboard')
    } catch {
      toast.error('Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Create Agent</h1>
          <p className="text-muted-foreground mt-1">
            Configure your conversational form agent
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={isSaving}>
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Settings</CardTitle>
                  <CardDescription>Basic configuration for your agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Lead Capture"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Public URL slug</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">/chat/</span>
                      <Input
                        id="slug"
                        placeholder="lead-capture"
                        value={slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="fields" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fields</CardTitle>
                  <CardDescription>Define the structured data to collect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Add fields like name, email, company. The agent will collect these through natural conversation.
                  </p>
                  <Button variant="outline" className="mt-4">Add Field</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="persona" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Persona</CardTitle>
                  <CardDescription>Set the tone and instructions for the AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="persona">Instructions</Label>
                    <Textarea
                      id="persona"
                      placeholder="You are a friendly sales assistant. Be concise and helpful. Collect the required fields naturally through conversation."
                      rows={6}
                      value={personaInstructions}
                      onChange={(e) => setPersonaInstructions(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appearance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the chat UI look</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Avatar, colors, and branding options coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
              <CardDescription>Live preview of your agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-card p-4 min-h-[200px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{name || 'Agent'}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {personaInstructions || 'Start the conversation...'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
