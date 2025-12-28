"use client";

import {
  Calendar,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Instagram,
  Link,
  MessageCircle,
  Plus,
  QrCode,
  Scissors,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

type LinkType = "general" | "service" | "barber";

interface LinkItem {
  id: number;
  name: string;
  description: string;
  url: string;
  type: LinkType;
  active: boolean;
  clicks: number;
  conversions: number;
  createdAt: string;
  serviceId?: number | null;
  barberId?: number | null;
}

type Service = { id: number; name: string };
type Barber = { id: number; name: string };

interface LinkCardProps {
  link: LinkItem;
  onEdit: (link: LinkItem) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

interface LinkFormData {
  name: string;
  description: string;
  type: LinkType;
  serviceId: number | null;
  barberId: number | null;
  active: boolean;
}

interface LinkModalProps {
  link: LinkItem | null;
  onSave: (data: LinkFormData) => void;
  onClose: () => void;
}

// Mock data
const linksData: LinkItem[] = [
  {
    id: 1,
    name: "Link Geral",
    description: "Link principal para agendamentos",
    url: "venust.app/agendar/venust",
    type: "general",
    active: true,
    clicks: 1247,
    conversions: 89,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Corte Masculino",
    description: "Link direto para agendamento de corte masculino",
    url: "venust.app/agendar/venust/corte-masculino",
    type: "service",
    serviceId: 1,
    active: true,
    clicks: 456,
    conversions: 34,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "João Silva",
    description: "Link para agendamentos com João Silva",
    url: "venust.app/agendar/venust/joao-silva",
    type: "barber",
    barberId: 1,
    active: true,
    clicks: 234,
    conversions: 18,
    createdAt: "2024-01-25",
  },
  {
    id: 4,
    name: "Combo Completo",
    description: "Link para combo corte + barba",
    url: "venust.app/agendar/venust/combo-completo",
    type: "service",
    serviceId: 2,
    active: false,
    clicks: 89,
    conversions: 7,
    createdAt: "2024-02-01",
  },
];

const services: Service[] = [
  { id: 1, name: "Corte Masculino" },
  { id: 2, name: "Combo Completo" },
  { id: 3, name: "Barba" },
  { id: 4, name: "Sobrancelha" },
];

const barbers: Barber[] = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Pedro Santos" },
  { id: 3, name: "Carlos Lima" },
];

function LinkCard({ link, onEdit, onDelete, onToggle }: LinkCardProps) {
  const [showQR, setShowQR] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${link.url}`);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  const shareWhatsApp = () => {
    const message = `Agende seu horário: https://${link.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareInstagram = () => {
    // Simular compartilhamento no Instagram
    copyLink();
  };

  const downloadQR = () => {
    // Simular download do QR Code
    console.log("Download QR Code");
  };

  const getTypeIcon = () => {
    switch (link.type) {
      case "general":
        return <Globe className="size-[16px] text-[#32f1b4]" />;
      case "service":
        return <Scissors className="size-[16px] text-[#32f1b4]" />;
      case "barber":
        return <User className="size-[16px] text-[#32f1b4]" />;
      default:
        return <Link className="size-[16px] text-[#32f1b4]" />;
    }
  };

  const getTypeLabel = () => {
    switch (link.type) {
      case "general":
        return "Geral";
      case "service":
        return "Serviço";
      case "barber":
        return "Profissional";
      default:
        return "Link";
    }
  };

  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
      <div className="flex items-start justify-between mb-[16px]">
        <div className="flex-1">
          <div className="flex items-center gap-[8px] mb-[4px]">
            {getTypeIcon()}
            <div className="font-semibold text-white text-[16px]">
              {link.name}
            </div>
            <span
              className={`px-[8px] py-[2px] rounded-[4px] text-[10px] font-medium ${
                link.active
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {link.active ? "Ativo" : "Inativo"}
            </span>
            <span className="px-[8px] py-[2px] bg-[#363a3d] rounded-[4px] text-[#9b9c9e] text-[10px] font-medium">
              {getTypeLabel()}
            </span>
          </div>
          <div className="text-[#9b9c9e] text-[14px] mb-[8px]">
            {link.description}
          </div>
          <div className="flex items-center gap-[8px] text-[#32f1b4] text-[12px] font-mono">
            <span>https://{link.url}</span>
            <button
              type="button"
              onClick={copyLink}
              className="text-[#9b9c9e] hover:text-[#32f1b4] transition-colors"
              title="Copiar link"
            >
              <Copy className="size-[14px]" />
            </button>
            <button
              type="button"
              onClick={() => window.open(`https://${link.url}`, "_blank")}
              className="text-[#9b9c9e] hover:text-[#32f1b4] transition-colors"
              title="Abrir link"
            >
              <ExternalLink className="size-[14px]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => onToggle(link.id)}
            className={`p-[6px] rounded-[6px] transition-colors ${
              link.active
                ? "text-green-400 hover:bg-green-500/20"
                : "text-[#9b9c9e] hover:bg-[#363a3d]"
            }`}
            title={link.active ? "Desativar" : "Ativar"}
          >
            {link.active ? (
              <Eye className="size-[16px]" />
            ) : (
              <EyeOff className="size-[16px]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onEdit(link)}
            className="p-[6px] text-[#9b9c9e] hover:text-[#32f1b4] hover:bg-[#363a3d] rounded-[6px] transition-colors"
            title="Editar"
          >
            <Edit className="size-[16px]" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(link.id)}
            className="p-[6px] text-[#9b9c9e] hover:text-red-400 hover:bg-red-500/20 rounded-[6px] transition-colors"
            title="Excluir"
          >
            <Trash2 className="size-[16px]" />
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
        <div className="bg-[#0d0f10] rounded-[8px] p-[12px]">
          <div className="text-[#9b9c9e] text-[12px] mb-[4px]">Cliques</div>
          <div className="text-white text-[18px] font-semibold">
            {link.clicks}
          </div>
        </div>
        <div className="bg-[#0d0f10] rounded-[8px] p-[12px]">
          <div className="text-[#9b9c9e] text-[12px] mb-[4px]">Conversões</div>
          <div className="text-white text-[18px] font-semibold">
            {link.conversions}
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-[8px]">
        <button
          type="button"
          onClick={() => setShowQR(!showQR)}
          className="flex-1 bg-[#363a3d] hover:bg-[#32f1b4] hover:text-black rounded-[8px] py-[8px] text-[#9b9c9e] hover:text-black text-[12px] font-medium transition-colors flex items-center justify-center gap-[6px]"
        >
          <QrCode className="size-[14px]" />
          QR Code
        </button>
        <button
          type="button"
          onClick={shareWhatsApp}
          className="flex-1 bg-[#25d366] hover:bg-[#20b858] rounded-[8px] py-[8px] text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-[6px]"
        >
          <MessageCircle className="size-[14px]" />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={shareInstagram}
          className="flex-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-80 rounded-[8px] py-[8px] text-white text-[12px] font-medium transition-opacity flex items-center justify-center gap-[6px]"
        >
          <Instagram className="size-[14px]" />
          Instagram
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="mt-[16px] p-[16px] bg-[#0d0f10] rounded-[8px] border border-[#363a3d]">
          <div className="flex items-center justify-between mb-[12px]">
            <div className="text-white text-[14px] font-medium">QR Code</div>
            <button
              type="button"
              onClick={downloadQR}
              className="text-[#32f1b4] hover:text-[#2cd9a0] transition-colors"
              title="Baixar QR Code"
            >
              <Download className="size-[16px]" />
            </button>
          </div>
          <div className="bg-white rounded-[8px] p-[16px] flex items-center justify-center">
            <div className="w-[120px] h-[120px] bg-black rounded-[4px] flex items-center justify-center">
              <QrCode className="size-[80px] text-white" />
            </div>
          </div>
          <div className="text-center text-[#9b9c9e] text-[12px] mt-[8px]">
            Escaneie para acessar o link
          </div>
        </div>
      )}
    </div>
  );
}

function LinkModal({ link, onSave, onClose }: LinkModalProps) {
  const initialFormData: LinkFormData = link
    ? {
        name: link.name,
        description: link.description,
        type: link.type,
        serviceId: link.serviceId ?? null,
        barberId: link.barberId ?? null,
        active: link.active,
      }
    : {
        name: "",
        description: "",
        type: "general",
        serviceId: null,
        barberId: null,
        active: true,
      };

  const [formData, setFormData] = useState<LinkFormData>(initialFormData);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const generateUrl = () => {
    let baseUrl = "venust.app/agendar/venust";

    if (formData.type === "service" && formData.serviceId !== null) {
      const service = services.find((s) => s.id === formData.serviceId);
      if (service) {
        baseUrl += `/${service.name.toLowerCase().replace(/\s+/g, "-")}`;
      }
    } else if (formData.type === "barber" && formData.barberId !== null) {
      const barber = barbers.find((b) => b.id === formData.barberId);
      if (barber) {
        baseUrl += `/${barber.name.toLowerCase().replace(/\s+/g, "-")}`;
      }
    }

    return baseUrl;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1d21] rounded-[12px] p-[24px] border border-[#363a3d] w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-[20px]">
          <div className="text-white text-[18px] font-semibold">
            {link ? "Editar Link" : "Novo Link"}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#9b9c9e] hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-[16px]">
          <div>
            <label
              htmlFor="link-name"
              className="block text-white text-[14px] font-medium mb-[8px]"
            >
              Nome do Link
            </label>
            <input
              id="link-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              placeholder="Ex: Link Geral, Corte Masculino..."
            />
          </div>

          <div>
            <label
              htmlFor="link-description"
              className="block text-white text-[14px] font-medium mb-[8px]"
            >
              Descrição
            </label>
            <textarea
              id="link-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4] h-[60px] resize-none"
              placeholder="Descrição do link..."
            />
          </div>

          <div>
            <label
              htmlFor="link-type"
              className="block text-white text-[14px] font-medium mb-[8px]"
            >
              Tipo de Link
            </label>
            <select
              id="link-type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as LinkType,
                  serviceId: null,
                  barberId: null,
                })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
            >
              <option value="general">Geral</option>
              <option value="service">Serviço Específico</option>
              <option value="barber">Profissional Específico</option>
            </select>
          </div>

          {formData.type === "service" && (
            <div>
              <label
                htmlFor="link-service"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Serviço
              </label>
              <select
                id="link-service"
                value={formData.serviceId ?? ""}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  setFormData({ ...formData, serviceId: val });
                }}
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.type === "barber" && (
            <div>
              <label
                htmlFor="link-barber"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Profissional
              </label>
              <select
                id="link-barber"
                value={formData.barberId ?? ""}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : null;
                  setFormData({ ...formData, barberId: val });
                }}
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              >
                <option value="">Selecione um profissional</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="bg-[#0d0f10] rounded-[8px] p-[12px]">
            <div className="text-[#9b9c9e] text-[12px] mb-[4px]">
              URL Gerada:
            </div>
            <div className="text-[#32f1b4] text-[14px] font-mono break-all">
              https://{generateUrl()}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="size-[16px] accent-[#32f1b4]"
            />
            <label htmlFor="active" className="text-white text-[14px]">
              Link ativo
            </label>
          </div>
        </div>

        <div className="flex items-center gap-[12px] mt-[24px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#363a3d] hover:bg-[#4a4f54] rounded-[8px] py-[10px] text-[#9b9c9e] text-[14px] font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] py-[10px] text-black text-[14px] font-semibold transition-colors"
          >
            {link ? "Salvar" : "Criar Link"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>(linksData);
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = links.filter(
    (link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (link: LinkItem) => {
    setEditingLink(link);
    setShowModal(true);
  };

  const handleDelete = (linkId: number) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

  const handleToggle = (linkId: number) => {
    setLinks(
      links.map((link) =>
        link.id === linkId ? { ...link, active: !link.active } : link,
      ),
    );
  };

  const handleSave = (linkData: LinkFormData) => {
    if (editingLink) {
      setLinks(
        links.map((link) =>
          link.id === editingLink.id ? { ...link, ...linkData } : link,
        ),
      );
    } else {
      const newLink: LinkItem = {
        ...linkData,
        id: Math.max(...links.map((l) => l.id)) + 1,
        url: "venust.app/agendar/venust", // Seria gerada dinamicamente
        clicks: 0,
        conversions: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setLinks([...links, newLink]);
    }
    setEditingLink(null);
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = links.reduce(
    (sum, link) => sum + link.conversions,
    0,
  );
  const activeLinks = links.filter((link) => link.active).length;

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d] px-[32px] py-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[8px]">
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
              Links
            </div>
            <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
              Gerencie os links de agendamento da sua barbearia
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[8px] flex items-center gap-[8px] transition-colors"
          >
            <Plus className="size-[16px] text-black" />
            <span className="text-black text-[14px] font-semibold">
              Novo Link
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[32px]">
        <div className="max-w-[1200px] mx-auto space-y-[24px]">
          {/* Search */}
          <div className="flex items-center gap-[16px]">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1d21] border border-[#363a3d] rounded-[8px] pl-[40px] pr-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              />
              <Link className="absolute left-[12px] top-[50%] translate-y-[-50%] size-[16px] text-[#9b9c9e]" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px]">
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <Link className="size-[20px] text-[#32f1b4]" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {links.length}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">
                    Total de Links
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <Eye className="size-[20px] text-green-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {activeLinks}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">Links Ativos</div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <ExternalLink className="size-[20px] text-blue-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {totalClicks}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">
                    Total de Cliques
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <Calendar className="size-[20px] text-purple-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {totalConversions}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">Conversões</div>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="text-center py-[40px]">
              <Link className="size-[48px] text-[#363a3d] mx-auto mb-[16px]" />
              <div className="text-[#9b9c9e] text-[16px] mb-[8px]">
                {searchTerm
                  ? "Nenhum link encontrado"
                  : "Nenhum link criado ainda"}
              </div>
              <div className="text-[#9b9c9e] text-[14px]">
                {searchTerm
                  ? "Tente buscar por outro termo"
                  : "Crie seu primeiro link de agendamento"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <LinkModal
          link={editingLink}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingLink(null);
          }}
        />
      )}
    </div>
  );
}
