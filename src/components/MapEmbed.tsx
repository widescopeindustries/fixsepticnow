interface MapEmbedProps {
  cityName: string;
}

export function MapEmbed({ cityName }: MapEmbedProps) {
  const query = encodeURIComponent(`${cityName}, Texas`);
  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <iframe
        title={`Service area map for ${cityName}, TX`}
        src={`https://maps.google.com/maps?q=${query}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
