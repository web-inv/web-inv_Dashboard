import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { 
  Layers, 
  Sparkles, 
  Zap, 
  Eye, 
  Code, 
  Plus, 
  Trash2,
  GripVertical,
  Image,
  Type,
  Layout,
  Video,
  FileText,
  MessageSquare,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  LayoutTemplate,
  ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateLibrary, Template } from "@/components/builder/TemplateLibrary";
import { TemplatePreview } from "@/components/builder/TemplatePreview";
import { downloadTemplate, downloadCurrentBuilder } from "@/utils/templateExport";

interface PageSection {
  id: string;
  name: string;
  type: string;
  status: "optimized" | "needs-work" | "critical";
  score: number;
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
  };
}

const availableSections = [
  { id: "hero", name: "Hero Section", icon: Layout, category: "Layout" },
  { id: "features", name: "Features Grid", icon: Layers, category: "Content" },
  { id: "testimonials", name: "Testimonials", icon: MessageSquare, category: "Social" },
  { id: "pricing", name: "Pricing Table", icon: FileText, category: "Conversion" },
  { id: "gallery", name: "Image Gallery", icon: Image, category: "Media" },
  { id: "video", name: "Video Section", icon: Video, category: "Media" },
  { id: "text", name: "Text Block", icon: Type, category: "Content" },
  { id: "cta", name: "Call to Action", icon: Zap, category: "Conversion" },
];

const initialPageSections: PageSection[] = [
  { 
    id: "1", 
    name: "Hero Section", 
    type: "hero",
    status: "optimized", 
    score: 95,
    content: { title: "Welcome to Our Platform", subtitle: "The best solution for your needs", buttonText: "Get Started" }
  },
  { 
    id: "2", 
    name: "Features Grid", 
    type: "features",
    status: "needs-work", 
    score: 72,
    content: { title: "Our Features", description: "Discover what makes us different" }
  },
  { 
    id: "3", 
    name: "Testimonials", 
    type: "testimonials",
    status: "optimized", 
    score: 88,
    content: { title: "What Our Customers Say" }
  },
  { 
    id: "4", 
    name: "Pricing Table", 
    type: "pricing",
    status: "critical", 
    score: 54,
    content: { title: "Choose Your Plan", subtitle: "Simple, transparent pricing" }
  },
  { 
    id: "5", 
    name: "Footer", 
    type: "footer",
    status: "optimized", 
    score: 91,
    content: { description: "© 2024 Your Company. All rights reserved." }
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "optimized":
      return "text-chart-4 bg-chart-4/20";
    case "needs-work":
      return "text-chart-5 bg-chart-5/20";
    case "critical":
      return "text-destructive bg-destructive/20";
    default:
      return "text-muted-foreground bg-muted";
  }
};

interface SortableItemProps {
  section: PageSection;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

function SortableItem({ section, index, isSelected, onSelect, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-muted/10 border transition-all group ${
        isSelected ? "border-primary shadow-lg shadow-primary/20" : "border-transparent hover:border-primary/30"
      }`}
    >
      <button
        className="touch-none cursor-grab active:cursor-grabbing p-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </button>
      <span className="text-xs md:text-sm text-muted-foreground w-5 md:w-6">{index + 1}</span>
      <button 
        onClick={onSelect}
        className="flex-1 text-left text-xs md:text-sm font-medium truncate"
      >
        {section.name}
      </button>
      <span className={`text-xs px-1.5 md:px-2 py-0.5 rounded-full ${getStatusColor(section.status)}`}>
        {section.score}
      </span>
      <button 
        onClick={onRemove}
        className="p-1 md:p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
      </button>
    </div>
  );
}

const Builder = () => {
  const [sections, setSections] = useState<PageSection[]>(initialPageSections);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(true);
  const [editForm, setEditForm] = useState<PageSection["content"]>({});
  const [activeTab, setActiveTab] = useState<string>("builder");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const selectedSectionData = useMemo(() => {
    return sections.find(s => s.id === selectedSection);
  }, [sections, selectedSection]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success("Section order updated!");
    }
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    if (selectedSection === id) setSelectedSection(null);
    toast.success("Section removed");
  };

  const addSection = (sectionTemplate: typeof availableSections[0]) => {
    const newSection: PageSection = {
      id: `new-${Date.now()}`,
      name: sectionTemplate.name,
      type: sectionTemplate.id,
      status: "needs-work",
      score: 50,
      content: { title: `New ${sectionTemplate.name}`, description: "Add your content here" }
    };
    setSections([...sections, newSection]);
    setSelectedSection(newSection.id);
    toast.success(`${sectionTemplate.name} added!`);
  };

  const startEditing = (section: PageSection) => {
    setEditingSection(section.id);
    setEditForm(section.content || {});
  };

  const saveEditing = () => {
    if (editingSection) {
      setSections(sections.map(s => 
        s.id === editingSection 
          ? { ...s, content: editForm, status: "needs-work" as const }
          : s
      ));
      setEditingSection(null);
      toast.success("Changes saved!");
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditForm({});
  };

  const optimizeAll = () => {
    setSections(sections.map(s => ({
      ...s,
      status: "optimized" as const,
      score: Math.min(100, s.score + Math.floor(Math.random() * 20) + 10)
    })));
    toast.success("All sections optimized with AI!");
  };

  const handleSelectTemplate = (template: Template) => {
    // Convert template sections to PageSection format
    const newSections: PageSection[] = template.sections.map((section, index) => ({
      id: `template-${Date.now()}-${index}`,
      name: section.name,
      type: section.type,
      status: "optimized" as const,
      score: 85 + Math.floor(Math.random() * 15),
      content: section.content
    }));
    
    setSections(newSections);
    setActiveTab("builder");
    setPreviewTemplate(null);
    toast.success(`"${template.name}" template applied!`);
  };

  const handlePreviewTemplate = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleDownloadTemplate = (template: Template) => {
    downloadTemplate(template);
    toast.success(`"${template.name}" downloaded as HTML!`);
  };

  const handleDownloadCurrent = () => {
    downloadCurrentBuilder(sections);
    toast.success("Your website downloaded as HTML!");
  };

  return (
    <DashboardLayout 
      title="Live Website Builder" 
      subtitle="Build, customize, and download professional websites"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 gap-1">
            <TabsTrigger value="builder" className="gap-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Builder</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <LayoutTemplate className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
          </TabsList>
          
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2"
            onClick={handleDownloadCurrent}
          >
            <Download className="w-4 h-4" />
            Download Website
          </Button>
        </div>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-0">
          <div className="glass-panel p-4 md:p-6">
            <TemplateLibrary 
              onSelectTemplate={handleSelectTemplate}
              onPreviewTemplate={handlePreviewTemplate}
            />
          </div>
        </TabsContent>

        {/* Builder Tab */}
        <TabsContent value="builder" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Available Sections - Collapsible on Mobile */}
            <div className="glass-panel p-4 md:p-6 lg:order-1">
              <button 
                onClick={() => setShowAddSection(!showAddSection)}
                className="w-full flex items-center justify-between lg:pointer-events-none"
              >
                <h3 className="font-display font-semibold text-base md:text-lg">Add Sections</h3>
                <span className="lg:hidden">
                  {showAddSection ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>
              
              <div className={`space-y-2 mt-4 ${showAddSection ? "block" : "hidden lg:block"}`}>
                {availableSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => addSection(section)}
                    className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-muted/10 hover:bg-muted/20 border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <section.icon className="w-4 md:w-5 h-4 md:h-5 text-muted-foreground group-hover:text-primary shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-xs md:text-sm font-medium truncate">{section.name}</p>
                      <p className="text-xs text-muted-foreground">{section.category}</p>
                    </div>
                    <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Page Builder */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:order-2">
              {/* Preview Window */}
              <div className="glass-panel-glow p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-chart-3/20">
                      <Eye className="w-4 md:w-5 h-4 md:h-5 text-chart-3" />
                    </div>
                    <h3 className="font-display font-semibold text-base md:text-lg">Live Preview</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="glass" size="sm" className="gap-2 text-xs md:text-sm">
                      <Code className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="hidden sm:inline">View Code</span>
                    </Button>
                  </div>
                </div>

                {/* Browser Preview */}
                <div className="rounded-xl overflow-hidden bg-muted/10 border border-border">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-2 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-destructive/50" />
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-chart-5/50" />
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-chart-4/50" />
                    </div>
                    <div className="flex-1 mx-2 md:mx-4">
                      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-md bg-muted/30 text-xs text-muted-foreground">
                        <span>🔒</span>
                        <span className="truncate">https://yourwebsite.com</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-4 min-h-[250px] md:min-h-[300px] space-y-2 max-h-[400px] overflow-y-auto">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`p-3 md:p-4 rounded-lg bg-muted/20 border transition-all cursor-pointer ${
                          selectedSection === section.id 
                            ? "border-primary shadow-lg shadow-primary/20" 
                            : "border-transparent hover:border-muted-foreground/30"
                        }`}
                      >
                        {editingSection === section.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editForm.title || ""}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              placeholder="Title"
                              className="bg-muted/30 border-border h-8 md:h-10 text-sm"
                            />
                            <Input
                              value={editForm.subtitle || ""}
                              onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                              placeholder="Subtitle"
                              className="bg-muted/30 border-border h-8 md:h-10 text-sm"
                            />
                            <Input
                              value={editForm.description || ""}
                              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              placeholder="Description"
                              className="bg-muted/30 border-border h-8 md:h-10 text-sm"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" variant="primary" onClick={saveEditing} className="gap-1 text-xs">
                                <Save className="w-3 h-3" /> Save
                              </Button>
                              <Button size="sm" variant="secondary" onClick={cancelEditing} className="gap-1 text-xs">
                                <X className="w-3 h-3" /> Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs md:text-sm truncate">{section.content?.title || section.name}</p>
                              {section.content?.subtitle && (
                                <p className="text-xs text-muted-foreground truncate mt-1">{section.content.subtitle}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={(e) => { e.stopPropagation(); startEditing(section); }}
                                className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                              >
                                <Edit3 className="w-3 md:w-4 h-3 md:h-4" />
                              </button>
                              <span className={`text-xs px-1.5 md:px-2 py-0.5 rounded-full ${getStatusColor(section.status)}`}>
                                {section.score}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section List with Drag & Drop */}
              <div className="glass-panel p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <h3 className="font-display font-semibold text-base md:text-lg">Page Sections</h3>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs md:text-sm text-muted-foreground">AI Optimization Active</span>
                  </div>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {sections.map((section, index) => (
                        <SortableItem
                          key={section.id}
                          section={section}
                          index={index}
                          isSelected={selectedSection === section.id}
                          onSelect={() => setSelectedSection(section.id)}
                          onRemove={() => removeSection(section.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                <div className="grid grid-cols-2 gap-2 md:gap-3 mt-4 md:mt-6">
                  <Button variant="secondary" className="gap-2 text-xs md:text-sm" onClick={handleDownloadCurrent}>
                    <Download className="w-3 md:w-4 h-3 md:h-4" />
                    Download
                  </Button>
                  <Button variant="primary" className="gap-2 text-xs md:text-sm" onClick={optimizeAll}>
                    <Zap className="w-3 md:w-4 h-3 md:h-4" />
                    Optimize All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={handleSelectTemplate}
          onDownload={handleDownloadTemplate}
        />
      )}
    </DashboardLayout>
  );
};

export default Builder;
