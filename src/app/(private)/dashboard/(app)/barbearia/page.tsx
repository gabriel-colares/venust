"use client";

import {
  Calendar,
  Camera,
  Clock,
  Copy,
  Edit,
  ExternalLink,
  Globe,
  MapPin,
  Phone,
  Plus,
  Save,
  Store,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type WorkingDaySchedule = {
  open: string;
  close: string;
  closed: boolean;
};

type WorkingHours = Record<DayKey, WorkingDaySchedule>;

type SpecialDate = {
  id: number;
  date: string;
  description: string;
  closed: boolean;
};

type BarbershopData = {
  name: string;
  description: string;
  address: string;
  mapLink: string;
  phone: string;
  whatsapp: string;
  slug: string;
  publicUrl: string;
  coverImage: string;
  gallery: string[];
  workingHours: WorkingHours;
  specialDates: SpecialDate[];
};

type WorkingHoursCardProps = {
  workingHours: WorkingHours;
  onUpdate: (newHours: WorkingHours) => void;
};

type ProfileCardProps = {
  data: BarbershopData;
  onUpdate: (newData: BarbershopData) => void;
};

type GalleryCardProps = {
  coverImage: string;
  gallery: string[];
  onUpdate: (
    newGallery: Partial<Pick<BarbershopData, "coverImage" | "gallery">>,
  ) => void;
};

const barbershopData: BarbershopData = {
  name: "Barbearia Venust",
  description:
    "A melhor barbearia da região, com profissionais experientes e ambiente acolhedor.",
  address: "Rua das Flores, 123 - Centro, São Paulo - SP",
  mapLink: "https://maps.google.com/?q=Rua+das+Flores+123+São+Paulo",
  phone: "(11) 99999-9999",
  whatsapp: "(11) 99999-9999",
  slug: "venust",
  publicUrl: "venust.app/barbearia/venust",
  coverImage: "/api/placeholder/800/400",
  gallery: [
    "/api/placeholder/300/200?img=1",
    "/api/placeholder/300/200?img=2",
    "/api/placeholder/300/200?img=3",
    "/api/placeholder/300/200?img=4",
  ],
  workingHours: {
    monday: { open: "08:00", close: "18:00", closed: false },
    tuesday: { open: "08:00", close: "18:00", closed: false },
    wednesday: { open: "08:00", close: "18:00", closed: false },
    thursday: { open: "08:00", close: "18:00", closed: false },
    friday: { open: "08:00", close: "18:00", closed: false },
    saturday: { open: "08:00", close: "16:00", closed: false },
    sunday: { open: "", close: "", closed: true },
  },
  specialDates: [
    {
      id: 1,
      date: "2024-12-25",
      description: "Natal",
      closed: true,
    },
    {
      id: 2,
      date: "2024-01-01",
      description: "Ano Novo",
      closed: true,
    },
  ],
};

const dayNames = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
} satisfies Record<DayKey, string>;

function WorkingHoursCard({ workingHours, onUpdate }: WorkingHoursCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [hours, setHours] = useState<WorkingHours>(workingHours);

  const handleSave = () => {
    onUpdate(hours);
    setEditMode(false);
  };

  const handleDayChange = (
    day: DayKey,
    field: keyof WorkingDaySchedule,
    value: string | boolean,
  ) => {
    setHours({
      ...hours,
      [day]: {
        ...hours[day],
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[24px] border border-[#363a3d]">
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-[12px]">
          <Clock className="size-[20px] text-[#32f1b4]" />
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px]">
            Horário de Funcionamento
          </div>
        </div>
        <button
          type="button"
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[8px] flex items-center gap-[8px] transition-colors"
        >
          {editMode ? (
            <Save className="size-[16px] text-black" />
          ) : (
            <Edit className="size-[16px] text-black" />
          )}
          <span className="text-black text-[14px] font-semibold">
            {editMode ? "Salvar" : "Editar"}
          </span>
        </button>
      </div>

      <div className="space-y-[12px]">
        {(Object.keys(hours) as DayKey[]).map((day) => (
          <div
            key={day}
            className="flex items-center justify-between p-[12px] bg-[#0d0f10] rounded-[8px]"
          >
            <div className="font-medium text-white text-[14px] w-[120px]">
              {dayNames[day]}
            </div>
            {editMode ? (
              <div className="flex items-center gap-[12px]">
                <label className="flex items-center gap-[8px]">
                  <input
                    type="checkbox"
                    checked={hours[day].closed}
                    onChange={(e) =>
                      handleDayChange(day, "closed", e.target.checked)
                    }
                    className="size-[16px] accent-[#32f1b4]"
                  />
                  <span className="text-[#9b9c9e] text-[12px]">Fechado</span>
                </label>
                {!hours[day].closed && (
                  <>
                    <input
                      type="time"
                      value={hours[day].open}
                      onChange={(e) =>
                        handleDayChange(day, "open", e.target.value)
                      }
                      className="bg-[#1a1d21] border border-[#363a3d] rounded-[6px] px-[8px] py-[4px] text-white text-[12px] outline-none focus:border-[#32f1b4]"
                    />
                    <span className="text-[#9b9c9e]">às</span>
                    <input
                      type="time"
                      value={hours[day].close}
                      onChange={(e) =>
                        handleDayChange(day, "close", e.target.value)
                      }
                      className="bg-[#1a1d21] border border-[#363a3d] rounded-[6px] px-[8px] py-[4px] text-white text-[12px] outline-none focus:border-[#32f1b4]"
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="text-[#9b9c9e] text-[14px]">
                {hours[day].closed
                  ? "Fechado"
                  : `${hours[day].open} às ${hours[day].close}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileCard({ data, onUpdate }: ProfileCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<BarbershopData>(data);

  const handleSave = () => {
    onUpdate(formData);
    setEditMode(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${formData.publicUrl}`);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[24px] border border-[#363a3d]">
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-[12px]">
          <Store className="size-[20px] text-[#32f1b4]" />
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px]">
            Perfil Público
          </div>
        </div>
        <button
          type="button"
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[8px] flex items-center gap-[8px] transition-colors"
        >
          {editMode ? (
            <Save className="size-[16px] text-black" />
          ) : (
            <Edit className="size-[16px] text-black" />
          )}
          <span className="text-black text-[14px] font-semibold">
            {editMode ? "Salvar" : "Editar"}
          </span>
        </button>
      </div>

      <div className="space-y-[16px]">
        <div>
          <div className="block text-white text-[14px] font-medium mb-[8px]">
            Nome da Barbearia
          </div>
          {editMode ? (
            <input
              id="barbershop-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
            />
          ) : (
            <div className="text-[#9b9c9e] text-[14px]">{formData.name}</div>
          )}
        </div>

        <div>
          <div className="block text-white text-[14px] font-medium mb-[8px]">
            Descrição
          </div>
          {editMode ? (
            <textarea
              id="barbershop-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4] h-[80px] resize-none"
            />
          ) : (
            <div className="text-[#9b9c9e] text-[14px]">
              {formData.description}
            </div>
          )}
        </div>

        <div>
          <div className="block text-white text-[14px] font-medium mb-[8px]">
            Endereço
          </div>
          {editMode ? (
            <input
              id="barbershop-address"
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
            />
          ) : (
            <div className="flex items-center gap-[8px]">
              <MapPin className="size-[16px] text-[#9b9c9e]" />
              <span className="text-[#9b9c9e] text-[14px]">
                {formData.address}
              </span>
              <button
                type="button"
                onClick={() => window.open(formData.mapLink, "_blank")}
                className="text-[#32f1b4] hover:text-[#2cd9a0] transition-colors"
              >
                <ExternalLink className="size-[16px]" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <div className="block text-white text-[14px] font-medium mb-[8px]">
              Telefone
            </div>
            {editMode ? (
              <input
                id="barbershop-phone"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              />
            ) : (
              <div className="flex items-center gap-[8px]">
                <Phone className="size-[16px] text-[#9b9c9e]" />
                <span className="text-[#9b9c9e] text-[14px]">
                  {formData.phone}
                </span>
              </div>
            )}
          </div>
          <div>
            <div className="block text-white text-[14px] font-medium mb-[8px]">
              WhatsApp
            </div>
            {editMode ? (
              <input
                id="barbershop-whatsapp"
                type="text"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              />
            ) : (
              <div className="text-[#9b9c9e] text-[14px]">
                {formData.whatsapp}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="block text-white text-[14px] font-medium mb-[8px]">
            URL Pública
          </div>
          {editMode ? (
            <div className="flex items-center gap-[8px]">
              <span className="text-[#9b9c9e] text-[14px]">
                venust.app/barbearia/
              </span>
              <input
                id="barbershop-slug"
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value,
                    publicUrl: `venust.app/barbearia/${e.target.value}`,
                  })
                }
                className="flex-1 bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              />
            </div>
          ) : (
            <div className="flex items-center gap-[8px]">
              <Globe className="size-[16px] text-[#9b9c9e]" />
              <span className="text-[#9b9c9e] text-[14px]">
                https://{formData.publicUrl}
              </span>
              <button
                type="button"
                onClick={copyUrl}
                className="text-[#32f1b4] hover:text-[#2cd9a0] transition-colors"
                title="Copiar URL"
              >
                <Copy className="size-[16px]" />
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(`https://${formData.publicUrl}`, "_blank")
                }
                className="text-[#32f1b4] hover:text-[#2cd9a0] transition-colors"
                title="Abrir página pública"
              >
                <ExternalLink className="size-[16px]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ coverImage, gallery }: GalleryCardProps) {
  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[24px] border border-[#363a3d]">
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-[12px]">
          <Camera className="size-[20px] text-[#32f1b4]" />
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px]">
            Fotos
          </div>
        </div>
      </div>

      <div className="space-y-[20px]">
        <div>
          <div className="text-white text-[14px] font-medium mb-[12px]">
            Foto de Capa
          </div>
          <div className="relative bg-[#0d0f10] rounded-[8px] h-[200px] border-2 border-dashed border-[#363a3d] flex items-center justify-center group hover:border-[#32f1b4] transition-colors cursor-pointer">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Capa"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover rounded-[8px]"
              />
            ) : (
              <div className="text-center">
                <Upload className="size-[32px] text-[#9b9c9e] mx-auto mb-[8px]" />
                <div className="text-[#9b9c9e] text-[14px]">
                  Clique para adicionar foto de capa
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[8px] flex items-center justify-center">
              <Upload className="size-[24px] text-white" />
            </div>
          </div>
        </div>

        <div>
          <div className="text-white text-[14px] font-medium mb-[12px]">
            Galeria
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
            {gallery.map((image: string, index: number) => (
              <div
                key={image}
                className="relative bg-[#0d0f10] rounded-[8px] h-[120px] border border-[#363a3d] group overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Galeria ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="size-[16px]" />
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-[#0d0f10] rounded-[8px] h-[120px] border-2 border-dashed border-[#363a3d] flex items-center justify-center group hover:border-[#32f1b4] transition-colors cursor-pointer">
              <div className="text-center">
                <Plus className="size-[24px] text-[#9b9c9e] mx-auto mb-[4px]" />
                <div className="text-[#9b9c9e] text-[12px]">Adicionar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BarbeariaPage() {
  const [data, setData] = useState<BarbershopData>(barbershopData);

  const handleProfileUpdate = (newData: BarbershopData) => {
    setData(newData);
  };

  const handleHoursUpdate = (newHours: WorkingHours) => {
    setData({ ...data, workingHours: newHours });
  };

  const handleGalleryUpdate = (
    newGallery: Partial<Pick<BarbershopData, "coverImage" | "gallery">>,
  ) => {
    setData({ ...data, ...newGallery });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d] px-[32px] py-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
            Barbearia
          </div>
          <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
            Configure o perfil público da sua barbearia
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[32px]">
        <div className="max-w-[1200px] mx-auto space-y-[24px]">
          <ProfileCard data={data} onUpdate={handleProfileUpdate} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
            <WorkingHoursCard
              workingHours={data.workingHours}
              onUpdate={handleHoursUpdate}
            />

            <div className="bg-[#1a1d21] rounded-[12px] p-[24px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[20px]">
                <Calendar className="size-[20px] text-[#32f1b4]" />
                <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px]">
                  Datas Especiais
                </div>
              </div>

              <div className="space-y-[12px]">
                {data.specialDates.map((date) => (
                  <div
                    key={date.id}
                    className="flex items-center justify-between p-[12px] bg-[#0d0f10] rounded-[8px]"
                  >
                    <div>
                      <div className="text-white text-[14px] font-medium">
                        {date.description}
                      </div>
                      <div className="text-[#9b9c9e] text-[12px]">
                        {new Date(date.date).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <span className="text-red-400 text-[12px]">Fechado</span>
                      <button
                        type="button"
                        className="text-[#9b9c9e] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="size-[16px]" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="w-full bg-[#363a3d] hover:bg-[#32f1b4] hover:text-black rounded-[8px] py-[12px] text-[#9b9c9e] hover:text-black text-[14px] font-medium transition-colors flex items-center justify-center gap-[8px]"
                >
                  <Plus className="size-[16px]" />
                  Adicionar Data Especial
                </button>
              </div>
            </div>
          </div>

          <GalleryCard
            coverImage={data.coverImage}
            gallery={data.gallery}
            onUpdate={handleGalleryUpdate}
          />
        </div>
      </div>
    </div>
  );
}
