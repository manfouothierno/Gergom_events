// src/components/services/ServiceIntro.tsx
import { ServiceFeature } from '@/types/services'
import {getIconByName} from "@/utils/icons";

interface ServiceIntroProps {
    description: string;
    features: ServiceFeature[];
    applications: string[];
    color: string;
}

const ServiceIntro = ({ description, features, applications, color }: ServiceIntroProps) => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Solutions professionnelles</h2>
                    <p
                        className="text-lg text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>

                {/* Caractéristiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {features.map((feature, index) => {
                        const Icon = getIconByName(feature.iconName);

                        return (
                            <div key={index} className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-opacity-70 transition-colors"
                                    style={{ backgroundColor: `${color}15` }}
                                >
                                    <Icon style={{ color: color }} className="text-xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Applications */}
                <div className="mt-16 bg-gray-50 rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Domaines d'application</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {applications.map((application, index) => (
                            <div
                                key={index}
                                className="text-center p-4 rounded-lg bg-white shadow-sm"
                                style={{ borderLeft: `3px solid ${color}` }}
                            >
                                <span className="text-gray-700">{application}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceIntro