import { MouseEvent, useState, useEffect } from 'react'

import VoiceCard from './VoiceCard'

import { HttpService } from 'utils/axios'

export interface IElevenLabVoice {
  voice_id: string
  name: string
  labels: {
    accent: string
    description: string
  }
  preview_url: string
}

interface ICampVoice {
  selectedId: string
  onVoiceSelect: (id: string) => void
}

export default function CampVoice({ selectedId, onVoiceSelect }: ICampVoice) {
  const [totalVoices, setTotalVoices] = useState<IElevenLabVoice[]>([])
  const [playingId, setPlayingId] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const onSoundStart = () => {
    setIsPlaying(true)
  }

  const onSoundEnd = () => {
    setIsPlaying(false)
  }

  const onSoundPlayClick =
    (voice: IElevenLabVoice) => (e: MouseEvent<HTMLOrSVGElement>) => {
      e.stopPropagation()
      setPlayingId(voice.voice_id)
      const sound = new Audio(voice.preview_url)
      sound.addEventListener('play', onSoundStart)
      sound.addEventListener('ended', onSoundEnd)
      sound.play()
    }

  useEffect(() => {
    HttpService.thirdPartyAPI()
      .get('https://api.elevenlabs.io/v1/voices')
      .then((response) => {
        const { status, data } = response
        if (status === 200) {
          setTotalVoices(data.voices ?? [])
        }
      })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-2 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {totalVoices.map((voice: IElevenLabVoice) => (
        <VoiceCard
          key={voice.voice_id}
          name={voice.name}
          accent={voice.labels.accent}
          description={voice.labels.description}
          isSelected={selectedId === voice.voice_id}
          isPlaying={isPlaying && playingId === voice.voice_id}
          selectVoice={() => onVoiceSelect(voice.voice_id)}
          playVoice={onSoundPlayClick(voice)}
        />
      ))}
    </div>
  )
}
