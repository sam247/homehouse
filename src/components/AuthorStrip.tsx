export function AuthorStrip({ full = false }: { full?: boolean }) {
  return (
    <section className="border border-border bg-background/40 p-6 md:p-8 reveal">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        <div className="shrink-0">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-border bg-foreground/5 md:h-20 md:w-20">
            <img src="/author.webp" alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Author</div>
          <div className="mt-2 font-serif text-2xl leading-tight">Hawa Hummingbird</div>
          <p className="mt-3 text-foreground/80 font-light leading-relaxed">
            Hawa is a Sufi healing practitioner, spiritual guide and mother whose work is rooted in
            lived experience, devotion and deep personal transformation. Drawing from Sufi
            Spiritual Healing, breath and bodywork, sacred sound and Holy Hijama Therapy, she
            offers compassionate spaces for healing, remembrance and reconnection to the Divine.
            Based at Home House Homestead in the Norfolk countryside, her path is one of surrender,
            simplicity and the unfolding journey of the heart.
          </p>

          {full && (
            <details className="mt-5 border-t border-border pt-5">
              <summary className="cursor-pointer text-xs uppercase tracking-[0.25em] text-accent hover:underline">
                Read full bio
              </summary>
              <div className="mt-4 text-foreground/80 font-light leading-relaxed space-y-4">
                <p>
                  Hawa’s path has been one of deep longing — a search for love, truth and a more
                  meaningful connection to life.
                </p>
                <p>
                  Originally studying music at the University of East Anglia, she was first
                  introduced to yoga in her early twenties, where she discovered a quieter and more
                  connected way of being through breath, movement and inner awareness.
                </p>
                <p>
                  Motherhood became one of the greatest loves of her life. Becoming a mother at 23,
                  and later raising twin boys, her early adult years were devoted to family life.
                  Yet beneath the surface remained an unshakable longing for something deeper.
                </p>
                <p>
                  Her journey led through periods of grief, addiction, disconnection and profound
                  inner searching, whilst yoga remained a constant thread throughout her life.
                  Following the death of her stepfather, unresolved pain and deeper questions began
                  to surface, marking the beginning of a sincere healing journey.
                </p>
                <p>
                  Over the years, she immersed herself in many healing modalities including yoga,
                  meditation, bodywork, ceremony, sacred sound and transformational practices — not
                  initially as a profession, but as a path towards healing her own heart and life.
                </p>
                <p>
                  A major turning point came after the breakdown of her 17-year marriage. During
                  this period of surrender and personal transformation, she was guided back to her
                  voice, to song, and to a deeper relationship with herself and the Divine. It was
                  also during this time that the spirit of the Hummingbird came to her as a symbol
                  of unconditional love, resilience and the ability to find sweetness amidst
                  suffering.
                </p>
                <p>
                  In 2020, she stepped away from her growing healing and coaching business, left
                  city life behind and moved to Home House in the remote Norfolk countryside. There,
                  immersed in simplicity, nature and spiritual devotion, a new way of living began
                  to unfold.
                </p>
                <p>
                  Her path eventually led her to Islam and the mystical tradition of Sufism — the
                  path of the heart — where her lifelong longing found a home. She was given the
                  name Hawa, meaning Eve, the first woman and mother of humanity.
                </p>
                <p>
                  Today, Hawa walks the Sufi path devotedly whilst studying Sufi Spiritual Healing
                  through the Sufi University, continuing her training towards a Master of Divinity.
                  Her work is grounded not only in study, but in lived experience, surrender and
                  ongoing spiritual practice.
                </p>
                <p>
                  Through Sufi healing, breath and bodywork, sacred sound, Holy Hijama Therapy and
                  the spaces she holds at Home House Homestead, she offers others a compassionate
                  space to heal, soften, reconnect and return to themselves and to the Divine.
                </p>
                <p>
                  Her work is rooted in the belief that when we empty ourselves of what no longer
                  serves, Divine Radiance can begin to shine through.
                </p>
              </div>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}

