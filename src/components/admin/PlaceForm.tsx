import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FileUpload } from "./FileUpload";
import type { PlaceFormData, Place } from "../../types/places";

interface PlaceFormProps {
  initialData?: Place;
  onSubmit: (data: PlaceFormData) => void;
  onCancel: () => void;
}

export const PlaceForm = ({ initialData, onSubmit, onCancel }: PlaceFormProps) => {
  const [formData, setFormData] = useState<PlaceFormData>({
    name: "",
    description: "",
    address: "",
    owner_name: "",
    opening_hours: "",
    entrance_fee: "",
    maps_url: "",
    phone: "",
    whatsapp: "",
    website: "",
    file_path: "",
    social_media: {
      facebook: "",
      instagram: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      const socialMedia = typeof initialData.social_media === 'object' ? initialData.social_media : { facebook: '', instagram: '' };
      
      setFormData({
        name: initialData.name,
        description: initialData.description,
        address: initialData.address,
        owner_name: initialData.owner_name || "",
        opening_hours: initialData.opening_hours as string,
        entrance_fee: initialData.entrance_fee || "",
        maps_url: initialData.maps_url || "",
        phone: initialData.phone || "",
        whatsapp: initialData.whatsapp || "",
        website: initialData.website || "",
        file_path: initialData.file_path || "",
        social_media: socialMedia as { facebook?: string; instagram?: string },
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Endereço *</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="description">Descrição *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner_name">Nome do Proprietário</Label>
          <Input
            id="owner_name"
            name="owner_name"
            value={formData.owner_name || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, owner_name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="opening_hours">Horário de Funcionamento</Label>
          <Input
            id="opening_hours"
            name="opening_hours"
            value={formData.opening_hours || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, opening_hours: e.target.value }))}
            placeholder="Ex: Segunda a Sexta 9h às 18h"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="entrance_fee">Valor da Entrada</Label>
          <Input
            id="entrance_fee"
            name="entrance_fee"
            value={formData.entrance_fee || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, entrance_fee: e.target.value }))}
            placeholder="Ex: R$ 20,00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maps_url">Link do Google Maps</Label>
          <Input
            id="maps_url"
            name="maps_url"
            value={formData.maps_url || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, maps_url: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Imagem</Label>
          <FileUpload
            accept="image/*"
            currentValue={formData.file_path}
            onFileSelect={(url) => setFormData(prev => ({ ...prev, file_path: url }))}
            buttonText="Upload de Imagem"
          />
        </div>

        {/* Redes Sociais */}
        <div className="space-y-2">
          <Label htmlFor="social_media.facebook">Facebook</Label>
          <Input
            id="social_media.facebook"
            name="social_media.facebook"
            value={formData.social_media?.facebook || ""}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              social_media: {
                ...prev.social_media,
                facebook: e.target.value
              }
            }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="social_media.instagram">Instagram</Label>
          <Input
            id="social_media.instagram"
            name="social_media.instagram"
            value={formData.social_media?.instagram || ""}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              social_media: {
                ...prev.social_media,
                instagram: e.target.value
              }
            }))}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Salvar" : "Adicionar"}
        </Button>
      </div>
    </form>
  );
};
