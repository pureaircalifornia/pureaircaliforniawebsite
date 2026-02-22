import React from 'react';

interface Step {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    steps: Step[];
    image?: string;
    totalTime?: string; // ISO 8601 duration format (e.g. PT2H)
    supply?: string[];
    tool?: string[];
}

const HowToSchema: React.FC<HowToSchemaProps> = ({
    name,
    description,
    steps,
    image,
    totalTime,
    supply,
    tool
}) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        image,
        totalTime,
        supply: supply?.map(item => ({
            '@type': 'HowToSupply',
            name: item
        })),
        tool: tool?.map(item => ({
            '@type': 'HowToTool',
            name: item
        })),
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            image: step.image,
            url: step.url
        }))
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(schema)}
        </script>
    );
};

export default HowToSchema;
