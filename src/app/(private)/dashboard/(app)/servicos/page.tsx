"use client";

import {
  ArrowDown,
  ArrowUp,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Package,
  Plus,
  Scissors,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { type FormEvent, useState } from "react";

type ServiceCategory = "individual" | "combo";

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number;
  bufferBefore: number;
  bufferAfter: number;
  minAdvance: number;
  isPublic: boolean;
  order: number;
  category: ServiceCategory;
  description: string;
  bookings: number;
  comboServices?: number[];
};

type ServiceFormData = {
  name: string;
  duration: number;
  price: number;
  bufferBefore: number;
  bufferAfter: number;
  minAdvance: number;
  isPublic: boolean;
  category: ServiceCategory;
  description: string;
  comboServices: number[];
};

// Mock data
const services: Service[] = [
  {
    id: 1,
    name: "Corte de Cabelo",
    duration: 30,
    price: 25,
    bufferBefore: 5,
    bufferAfter: 5,
    minAdvance: 60,
    isPublic: true,
    order: 1,
    category: "individual",
    description: "Corte tradicional masculino",
    bookings: 45,
  },
  {
    id: 2,
    name: "Barba",
    duration: 20,
    price: 20,
    bufferBefore: 0,
    bufferAfter: 5,
    minAdvance: 30,
    isPublic: true,
    order: 2,
    category: "individual",
    description: "Aparar e modelar barba",
    bookings: 32,
  },
  {
    id: 3,
    name: "Corte + Barba",
    duration: 45,
    price: 40,
    bufferBefore: 5,
    bufferAfter: 10,
    minAdvance: 120,
    isPublic: true,
    order: 3,
    category: "combo",
    description: "Combo completo de corte e barba",
    bookings: 67,
    comboServices: [1, 2],
  },
  {
    id: 4,
    name: "Sobrancelha",
    duration: 15,
    price: 15,
    bufferBefore: 0,
    bufferAfter: 0,
    minAdvance: 30,
    isPublic: false,
    order: 4,
    category: "individual",
    description: "Aparar sobrancelhas",
    bookings: 12,
  },
];

type ServiceCardProps = {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: number) => void;
  onToggleVisibility: (serviceId: number) => void;
  onMoveUp: (serviceId: number) => void;
  onMoveDown: (serviceId: number) => void;
};

function ServiceCard({
  service,
  onEdit,
  onDelete,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
}: ServiceCardProps) {
  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d] hover:border-[#32f1b4]/30 transition-colors">
      <div className="flex items-start justify-between mb-[16px]">
        <div className="flex items-center gap-[16px]">
          <div className="bg-[#32f1b4] rounded-[8px] size-[48px] flex items-center justify-center">
            {service.category === "combo" ? (
              <Package className="size-[20px] text-black" />
            ) : (
              <Scissors className="size-[20px] text-black" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-[8px] mb-[4px]">
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px]">
                {service.name}
              </div>
              {service.category === "combo" && (
                <span className="bg-[#32f1b4] text-black text-[10px] px-[6px] py-[2px] rounded-[4px] font-semibold">
                  COMBO
                </span>
              )}
              {!service.isPublic && (
                <span className="bg-[#9b9c9e] text-black text-[10px] px-[6px] py-[2px] rounded-[4px] font-semibold">
                  PRIVADO
                </span>
              )}
            </div>
            <div className="text-[#9b9c9e] text-[12px]">
              {service.description}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => onToggleVisibility(service.id)}
            className={`p-[8px] rounded-[6px] transition-colors ${
              service.isPublic
                ? "text-[#32f1b4] hover:bg-[#32f1b4]/10"
                : "text-[#9b9c9e] hover:bg-[#363a3d]"
            }`}
            title={service.isPublic ? "Tornar privado" : "Tornar público"}
          >
            {service.isPublic ? (
              <Eye className="size-[16px]" />
            ) : (
              <EyeOff className="size-[16px]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onMoveUp(service.id)}
            className="text-[#9b9c9e] hover:text-white transition-colors p-[8px]"
            title="Mover para cima"
          >
            <ArrowUp className="size-[16px]" />
          </button>
          <button
            type="button"
            onClick={() => onMoveDown(service.id)}
            className="text-[#9b9c9e] hover:text-white transition-colors p-[8px]"
            title="Mover para baixo"
          >
            <ArrowDown className="size-[16px]" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(service)}
            className="text-[#9b9c9e] hover:text-white transition-colors p-[8px]"
          >
            <Edit className="size-[16px]" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(service.id)}
            className="text-[#9b9c9e] hover:text-red-400 transition-colors p-[8px]"
          >
            <Trash2 className="size-[16px]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[16px] mb-[16px]">
        <div className="text-center">
          <div className="text-[#32f1b4] text-[18px] font-semibold">
            {service.duration}min
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Duração</div>
        </div>
        <div className="text-center">
          <div className="text-[#32f1b4] text-[18px] font-semibold">
            R$ {service.price}
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Preço</div>
        </div>
        <div className="text-center">
          <div className="text-[#32f1b4] text-[18px] font-semibold">
            {service.minAdvance}min
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Antecedência</div>
        </div>
        <div className="text-center">
          <div className="text-[#32f1b4] text-[18px] font-semibold">
            {service.bookings}
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Agendamentos</div>
        </div>
      </div>

      {(service.bufferBefore > 0 || service.bufferAfter > 0) && (
        <div className="bg-[#0d0f10] rounded-[8px] p-[12px]">
          <div className="text-[#9b9c9e] text-[12px] mb-[4px]">Buffer:</div>
          <div className="text-white text-[12px]">
            {service.bufferBefore > 0 && `${service.bufferBefore}min antes`}
            {service.bufferBefore > 0 && service.bufferAfter > 0 && " • "}
            {service.bufferAfter > 0 && `${service.bufferAfter}min depois`}
          </div>
        </div>
      )}
    </div>
  );
}

type ServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onSave: (data: ServiceFormData) => void;
};

function ServiceModal({ service, onClose, onSave }: ServiceModalProps) {
  const initialFormData: ServiceFormData = service
    ? {
        name: service.name,
        duration: service.duration,
        price: service.price,
        bufferBefore: service.bufferBefore,
        bufferAfter: service.bufferAfter,
        minAdvance: service.minAdvance,
        isPublic: service.isPublic,
        category: service.category,
        description: service.description,
        comboServices: service.comboServices ?? [],
      }
    : {
        name: "",
        duration: 30,
        price: 0,
        bufferBefore: 0,
        bufferAfter: 0,
        minAdvance: 60,
        isPublic: true,
        category: "individual",
        description: "",
        comboServices: [],
      };

  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-[#1a1d21] rounded-[12px] border border-[#363a3d] w-full max-w-[600px] max-h-[80vh] overflow-auto">
        <div className="p-[24px] border-b border-[#363a3d]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[20px]">
              {service ? "Editar Serviço" : "Novo Serviço"}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[#9b9c9e] hover:text-white transition-colors p-[8px]"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-[24px] space-y-[20px]">
          <div className="grid grid-cols-2 gap-[16px]">
            <div>
              <label
                htmlFor="service-name"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Nome do Serviço
              </label>
              <input
                id="service-name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="service-category"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Categoria
              </label>
              <select
                id="service-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ServiceCategory,
                  })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              >
                <option value="individual">Individual</option>
                <option value="combo">Combo</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="service-description"
              className="block text-white text-[14px] font-medium mb-[8px]"
            >
              Descrição
            </label>
            <textarea
              id="service-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4] h-[80px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div>
              <label
                htmlFor="service-duration"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Duração (minutos)
              </label>
              <input
                id="service-duration"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value, 10),
                  })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                min="1"
                required
              />
            </div>
            <div>
              <label
                htmlFor="service-price"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Preço (R$)
              </label>
              <input
                id="service-price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[16px]">
            <div>
              <label
                htmlFor="service-buffer-before"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Buffer Antes (min)
              </label>
              <input
                id="service-buffer-before"
                type="number"
                value={formData.bufferBefore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bufferBefore: parseInt(e.target.value, 10),
                  })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="service-buffer-after"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Buffer Depois (min)
              </label>
              <input
                id="service-buffer-after"
                type="number"
                value={formData.bufferAfter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bufferAfter: parseInt(e.target.value, 10),
                  })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="service-minAdvance"
                className="block text-white text-[14px] font-medium mb-[8px]"
              >
                Antecedência (min)
              </label>
              <input
                id="service-minAdvance"
                type="number"
                value={formData.minAdvance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minAdvance: parseInt(e.target.value, 10),
                  })
                }
                className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                min="0"
              />
            </div>
          </div>

          <div className="flex items-center gap-[12px]">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.target.checked })
              }
              className="size-[16px] accent-[#32f1b4]"
            />
            <label htmlFor="isPublic" className="text-white text-[14px]">
              Visível publicamente
            </label>
          </div>

          <div className="flex items-center gap-[16px] pt-[16px] border-t border-[#363a3d]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#363a3d] hover:bg-[#404449] rounded-[8px] py-[12px] text-[#9b9c9e] text-[14px] font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] py-[12px] text-black text-[14px] font-semibold transition-colors"
            >
              {service ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ServicosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = (serviceId: number) => {
    // Implementar lógica de exclusão
    console.log("Deletar serviço:", serviceId);
  };

  const handleToggleVisibility = (serviceId: number) => {
    // Implementar lógica de toggle de visibilidade
    console.log("Toggle visibilidade:", serviceId);
  };

  const handleMoveUp = (serviceId: number) => {
    // Implementar lógica de reordenação
    console.log("Mover para cima:", serviceId);
  };

  const handleMoveDown = (serviceId: number) => {
    // Implementar lógica de reordenação
    console.log("Mover para baixo:", serviceId);
  };

  const handleSave = (serviceData: ServiceFormData) => {
    // Implementar lógica de salvamento
    console.log("Salvar serviço:", serviceData);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d] px-[32px] py-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[8px]">
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
              Serviços
            </div>
            <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
              Gerencie os serviços da sua barbearia
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedService(null);
              setShowModal(true);
            }}
            className="bg-[#32f1b4] h-[40px] px-[20px] rounded-[8px] flex items-center gap-[8px] hover:bg-[#2cd9a0] transition-colors"
          >
            <Plus className="size-[16px] text-black" />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-black text-[14px]">
              Novo Serviço
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[32px]">
        <div className="flex flex-col gap-[24px]">
          {/* Filters */}
          <div className="flex items-center gap-[16px]">
            <div className="bg-[#1a1d21] relative rounded-[8px] h-[40px] w-[320px] border border-[#363a3d]">
              <div className="flex items-center h-full px-[16px] gap-[12px]">
                <Search className="size-[16px] text-[#9b9c9e]" />
                <input
                  type="text"
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent flex-1 text-white text-[14px] outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              className="bg-[#1a1d21] h-[40px] px-[16px] rounded-[8px] flex items-center gap-[8px] border border-[#363a3d] hover:bg-[#1f2226] transition-colors"
            >
              <Filter className="size-[16px] text-[#9b9c9e]" />
              <span className="text-[#9b9c9e] text-[14px]">Filtros</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-[24px]">
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Scissors className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">
                  Total de Serviços
                </span>
              </div>
              <div className="text-white text-[24px] font-semibold">
                {services.length}
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Eye className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">Públicos</span>
              </div>
              <div className="text-white text-[24px] font-semibold">
                {services.filter((s) => s.isPublic).length}
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Package className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">Combos</span>
              </div>
              <div className="text-white text-[24px] font-semibold">
                {services.filter((s) => s.category === "combo").length}
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Star className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">Mais Popular</span>
              </div>
              <div className="text-white text-[24px] font-semibold">
                {
                  services
                    .reduce((prev, current) =>
                      prev.bookings > current.bookings ? prev : current,
                    )
                    .name.split(" ")[0]
                }
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {showModal && (
        <ServiceModal
          service={selectedService}
          onClose={() => {
            setShowModal(false);
            setSelectedService(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
